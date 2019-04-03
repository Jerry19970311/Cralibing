import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.*;

public class BBarTest {
    //楼层
    public static final String CLASSNAME="d_post_content j_d_post_content ";
    //评论正文文本所在的元素（不含楼中楼）
    public static final String PARENT_CLASSNAME="l_post l_post_bright j_l_post clearfix  ";
    //投票地址
    public static final String URL_BASE_NAME="https://tieba.baidu.com/p/6062186860";
    //用来装填html原文，每解析完一页，自动清空。
    public static StringBuilder htmlBuilder=new StringBuilder();
    //htmlBuilder装填完毕后，输出结果到该变量。
    public static String html;
    //存放键值对，其中：键为候选人的序号，值为候选人的得票数。
    public static Map<Integer,Integer> totals=new Hashtable<Integer, Integer>();
    //存放已经进行了有效投票的用户。
    public static Set<String> hasVoted=new HashSet<String>();
    //无效回复数。
    public static int illegal=0;
    //存放候选人及其得票数的数组，待收集完毕后，进行排序。
    public static String fileName="ResultFile";
    public static String voteFile="VoteResult";
    public static FileOutputStream fileOutputStream;
    public static FileOutputStream fileOutputStream2;
    public static List<Integer[]> integers=new ArrayList<>();
    public static void main(String[] args) throws IOException {
        //file();
        //date();
        //total();
        mess();
    }
    public static void file() throws IOException {
        File file=new File(fileName);
        file.createNewFile();
        fileOutputStream=new FileOutputStream(file);
        File file2=new File(voteFile);
        file2.createNewFile();
        fileOutputStream2=new FileOutputStream(file2);
    }
    public static void date(){
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        String s=simpleDateFormat.format(new Date());
        System.out.println("当前时间:\n"+s);
    }
    public static void total() throws IOException {
        //总页面数，初始值设为最大值。
        //int totalPage=Integer.MAX_VALUE;
        int totalPage=453;
        //nowPage表示当前页面数。
        for(int nowPage=1;nowPage<=totalPage;nowPage++) {
            //拼接成为一个完整地址
            String name = URL_BASE_NAME + "?pn=" + nowPage;
            URL url = new URL(name);
            URLConnection connection = url.openConnection();
            connection.setRequestProperty("User-Agent", "Mozilla/31.0 (compatible; MSIE 10.0; Windows NT; DigExt)");
            InputStream inputStream=connection.getInputStream();
            BufferedReader reader=new BufferedReader(new InputStreamReader(inputStream));
            //BufferedReader的工作机制是按行读取，非一次性读取，所以需要一个StringBuilder进行装填，最后再输出为String。
            String line=null;
            while ((line=reader.readLine())!=null){
                htmlBuilder.append(line);
            }
            html=htmlBuilder.toString();
            Document document= Jsoup.parse(html);
            //由于该帖活动较为频繁，在爬取过程中可能会更新总页数，故每次翻页都更新totalPage变量。
            //Elements totalCommentsLocal=document.select("li[class=\"l_reply_num\"]");
            //totalPage=Integer.parseInt(totalCommentsLocal.first().children().eachText().get(1));

            //获取一个页面的所有楼层。
            Elements userModels=document.select("div[class=\""+PARENT_CLASSNAME+"\"]");
            Iterator<Element> modelIterator=userModels.iterator();
            System.out.println("total:"+totalPage+"-------------------now:"+nowPage);
            System.out.println("当前数据:");
            fileOutputStream.write("------------------------------------------------\n".getBytes());
            fileOutputStream2.write("------------------------------------------------\n".getBytes());
            fileOutputStream.write(("当前楼层:"+String.valueOf(nowPage)+"\n").getBytes());
            fileOutputStream2.write(("当前楼层:"+String.valueOf(nowPage)+"\n").getBytes());
            //分析每个楼层。
            while (modelIterator.hasNext()){
                Element model=modelIterator.next();
                //获取该楼层说明用户名的属性值。
                String attr=model.attr("data-field");
                //解析出用户名。
                String[] names=attr.split("\"");
                String na=unicodeToCn(names[7]);

                //在该楼层中获取评论正文（不涉及楼中楼）
                Elements elements=model.select("div[class=\""+CLASSNAME+"\"]");
                List<String> list=elements.eachText();
                fileOutputStream.write(na.getBytes());
                for(Iterator<String> iterator=list.iterator();iterator.hasNext();){
                    String str=iterator.next();
                    //只有两个条件的评论都满足才能计入票数：①按照格式②没有在hasVoted集里的用户。
                    if(str.matches("[\\s\\S]*投[0-9]{1,4}号候选人$")&&(hasVoted.contains(na)==false)&&(str.startsWith(na))){
                        //一旦计入票数，该用户便加入hasVote集，之后在本帖发任何信息都是无效的。
                        hasVoted.add(na);
                        //根据关键词获取候选人序号
                        String[] strings=str.split("投|号候选人");
                        //不采用strings[1]，而采用strings[strings.length-1]的原因：
                        //如果投票人ID中带有“投”字，那么会干扰这一程序，因此从尾端开始着。
                        int number=Integer.parseInt(strings[strings.length-1]);
                        //如果HashTable有该候选人序号则直接在原数上+1，如果没有，则置初始值1
                        if(!totals.containsKey(number)){
                            totals.put(number,1);
                        }else{
                            totals.put(number,totals.get(number)+1);
                        }
                        fileOutputStream.write("【有效】".getBytes());
                    }else{
                        //非法评论数。
                        illegal++;
                        fileOutputStream.write("【无效】".getBytes());
                    }
                    fileOutputStream.write((str+"\n").getBytes());
                }
            }
            Iterator<Integer> ints=totals.keySet().iterator();
            while (ints.hasNext()){
                int no=ints.next();
                Integer[] temp=new Integer[2];
                temp[0]=no;
                temp[1]=totals.get(no);
                fileOutputStream2.write(("["+temp[0]+","+temp[1]+"]\n").getBytes());
                integers.add(temp);
                /*if(integers.isEmpty()){
                    integers.add(temp);
                }else{
                    int length=integers.size();
                    for(int i=0;i<length;i++){
                        if(integers.get(i)[1]<temp[1]){
                            integers.add(i,temp);
                        }
                        if(integers.get(i)[1]==temp[1]){
                            if(integers.get(i)[0]>temp[0]){
                                integers.add(i,temp);
                            }
                        }
                        if(i==length-1){
                            ((LinkedList<Integer[]>) integers).addLast(temp);
                        }
                    }
                }*/
            }
            try {
                Thread.sleep((long) (2000+2000*Math.random()));
                date();
                htmlBuilder=new StringBuilder();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
/*
            Elements totalCommentsLocal=document.select("li[class=\"l_reply_num\"]");
            totalPage=Integer.parseInt(totalCommentsLocal.first().children().eachText().get(1));
            Elements elements=document.select("div[class=\""+CLASSNAME+"\"]");
            List<String> list=elements.eachText();
            for(Iterator<String> iterator=list.iterator();iterator.hasNext();){
                String str=iterator.next();
                if(str.matches("[\\s\\S]*投[0-9]{1,4}号候选人$")){
                    //System.out.println(str);
                    String[] strings=str.split("投|号候选人");
                    int number=Integer.parseInt(strings[strings.length-1]);
                    //System.out.println(number+":"+totals.get(number));
                    if(!totals.containsKey(number)){
                        //System.out.println("?????????????????????");
                        totals.put(number,1);
                    }else{
                        totals.put(number,totals.get(number)+1);
                    }
                    //System.out.println(Arrays.asList(strings)+"--"+totals.get(number));
                }
            }
            System.out.println("total:"+totalPage+"-------------------now:"+nowPage);
            System.out.println("当前数据:");
            Iterator<Integer> ints=totals.keySet().iterator();
            while (ints.hasNext()){
                int no=ints.next();
                System.out.println("["+no+","+totals.get(no)+"]");
            }
            try {
                Thread.sleep((long) (5000+5000*Math.random()));
                date();
                htmlBuilder=new StringBuilder();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }*/
            fileOutputStream.write(("无效回复数:"+illegal+"\n").getBytes());
        }
        System.out.println("排序结果:");
        Iterator<Integer[]> resultIterator=integers.iterator();
        while (resultIterator.hasNext()){
            Integer[] result=resultIterator.next();
            System.out.println("("+1+")序号:"+result[0]+"\t\t\t得票数:"+result[1]);
        }
        fileOutputStream.flush();
        fileOutputStream2.flush();
        fileOutputStream.close();
        fileOutputStream2.close();
    }
    private static String unicodeToCn(String unicode) {
        String[] strs = unicode.split("\\\\u");
        String returnStr = strs[0];
        // 由于unicode字符串以 \ u 开头，因此分割出的第一个字符是""。
        for (int i = 1; i < strs.length; i++) {
            if(strs[i].length()==4) {
                returnStr += (char) Integer.valueOf(strs[i], 16).intValue();
            }else{
                String temp1=strs[i].substring(0,4);
                returnStr += (char) Integer.valueOf(temp1, 16).intValue();
                String temp2=strs[i].substring(4);
                returnStr += temp2;
            }
        }
        return returnStr;
    }

    public static void mess() throws IOException {
        FileReader fileReader=new FileReader("result");
        BufferedReader bufferedReader=new BufferedReader(fileReader);
        String s;
        while ((s=bufferedReader.readLine())!=null){
            String[] temps=s.split("\\[|\\]|\\,");
            //System.out.println(Arrays.asList(temps));
            Integer no=Integer.parseInt(temps[1]);//位置待议
            Integer votes=Integer.parseInt(temps[2]);//位置待议
            Integer[] itemp=new Integer[2];
            itemp[0]=no;
            itemp[1]=votes;
            integers.add(itemp);
            //System.out.println(no+"-------------"+votes);
            MergeSort(integers,0,integers.size()-1);
            for(int i=0;i<integers.size();i++){
                System.out.println("序号:"+integers.get(i)[0]+"\t\t\t\t\t得票数:"+integers.get(i)[1]);
            }
        }
    }
    private static void MergeSort(List<Integer[]> a, int p, int r) {
        if(p<r){
            int q = (p+r)/2;
//			p表示从子序列的哪个索引开始，q表示子序列中间的位置
            MergeSort(a,p,q);
            MergeSort(a,q+1,r);
            Merge(a,p,q,r);
        }
    }
    private static void Merge(List<Integer[]> a, int p, int q, int r) {
//		n1和n2分别表示左边序列和右边序列的长度。左边从p开始包括q，右边从q+1开始
        int n1 = q-p+1;
        int n2 = r-q;
        //int L[][] = new int[n1][2];
        //int R[][] = new int[n2][2];
        Integer[][] L=new Integer[n1][2];
        Integer[][] R=new Integer[n2][2];
//		k用来表示当前遍历的数组a的索引
        int i=0,j=0,k=0;
//		分别给L和R赋值
        for(i=0,k=p; i<n1; i++,k++){
            //L[i] = a[k];
            L[i]=a.get(k);
        }
//		从右边开始
        for(j=0,k=q+1; j<n2; j++,k++){
            //R[j] = a[k];
            R[j]=a.get(k);
        }
//		比较大小,从小到大排列
        for(i=0,j=0,k=p; i<n1&&j<n2; k++){
            if(L[i][1] < R[j][1]/*||((L[i][1] == R[j][1])&&(L[i][0]>R[j][0]))*/){
                //a[k] = R[j];
                a.set(k,R[j]);
                j++;
            }else{
                //a[k] = L[i];
                a.set(k,L[i]);
                i++;
            }
        }//for
//		将两个数组中剩下的数放到a中
        if(i<n1){
            for(j=i; j<n1; j++,k++){
                //a[k] = L[j];
                a.set(k,L[j]);
            }
        }
        if(j<n2){
            for(i=j; i<n2; i++,k++){
                //a[k] = R[i];
                a.set(k,R[i]);
            }
        }
    }
}
