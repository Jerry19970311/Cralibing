import com.google.gson.*;
import com.google.gson.stream.JsonReader;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Iterator;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

public class TencentTest {
    public static Queue<DataBean> dataBeanQueue=new LinkedBlockingQueue<>();
    public static void main(String[] args){
        /*try {
            test();
        } catch (Exception e) {
            e.printStackTrace();
        }*/
        try {
            gsonTest();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
    public static void test() throws IOException, InterruptedException {
        int date=20190301;
        int num=25;
        int page=0;
        for(page=0;page<=8;page++) {
            String chn = "sports";
            String url = "https://pacaio.match.qq.com/openapi/json?key=" + chn + ":" + date + "&num=" + num + "&page=" + page;
            String fileName = num + "_" + page;
            String dirName = "E:/Result/tencent/1/list/" + chn + "/" + date;
            String filePath = dirName + "/" + fileName;
            URL u = new URL(url);
            URLConnection connection = u.openConnection();
            connection.setRequestProperty("User-Agent", "Mozilla/31.0 (compatible; MSIE 10.0; Windows NT; DigExt)");
            InputStream inputStream = connection.getInputStream();
            //System.out.println(connection.getContentEncoding());
            //FileReader fileReader=new FileReader()
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
            File dir = new File(dirName);
            System.out.println(dirName);
            System.out.println(fileName);
            System.out.println(filePath);
            File file = new File(filePath);
            if (!file.exists()) {
                //System.out.println("-----------------------------------------");
                dir.mkdirs();
            }
            file.createNewFile();
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            Gson gson = new Gson();
            JsonReader jsonReader = new JsonReader(bufferedReader);
            byte[] bytes = inputStream.readAllBytes();
            fileOutputStream.write(bytes);
        /*String line=null;
        while((line=bufferedReader.readLine())!=null){
            System.out.println(line);
            String[] temps=line.split("\"|'");
            for(int i=0;i<temps.length;i++){
                if(temps[i].contains("//")){
                    System.out.println(temps[i]);
                }
            }
            if(line.contains("qq_channel")){
                System.out.println(line);
            }
        }*/
            NewsList newsList = gson.fromJson(jsonReader, NewsList.class);
            bufferedReader.close();
            fileOutputStream.flush();
            fileOutputStream.close();
            System.out.println(newsList);
        }
        Thread.sleep((long) (5000+5000*Math.random()));
        //System.out.println("-------------------------------------------------------------\n数量:"+newsList.getData().size());
        //List<DataBean> dataBeans=newsList.getData();
        //dataBeanQueue.addAll(dataBeans);
    }
    public static void download(String filePath){
    }
    public static void gsonTest() throws FileNotFoundException {
        Gson gson=new Gson();
        String s="{\n" +
                "      \"chn\": \"奇闻趣事\",\n" +
                "      \"cid\": \"302\",\n" +
                "      \"name\": \"news_fun\"\n" +
                "    }";
        Data data=gson.fromJson(s,Data.class);
        System.out.println(data.getChn()+"-"+data.getCid()+"-"+data.getName());
        Reader reader=new FileReader(new File("categories.json"));
        JsonReader jsonReader=new JsonReader(reader);
        //JsonParser parser=new JsonParser();
        /*JsonObject jsonObject=parser.parse(jsonReader).getAsJsonObject();
        JsonArray jsonArray=jsonObject.getAsJsonArray("data");
        for(JsonElement jsonElement:jsonArray){
            System.out.println(jsonElement);
        }*/
        Categories categories=gson.fromJson(jsonReader,Categories.class);
        System.out.println(categories);
    }
    public static void test2() throws IOException {
        String urls="https://new.qq.com/cmsn/20190225/20190225011655.html";
        URL url=new URL(urls);
        URLConnection urlConnection=url.openConnection();
        urlConnection.setRequestProperty("User-Agent", "Mozilla/31.0 (compatible; MSIE 10.0; Windows NT; DigExt)");
        InputStream inputStream=urlConnection.getInputStream();
        BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(inputStream,"GB2312"));
        String s;
        while ((s=bufferedReader.readLine())!=null){
            System.out.println(s);
        }
        Document document=Jsoup.parse(url,20000);
        System.out.println("---------------------------------------------------------------------------------------");
        //System.out.println(document.childNode(1).childNode(2));
        Iterator<Element> first=document.children().iterator();
        Element temp;
        for(temp=first.next();("html".equalsIgnoreCase(temp.tagName())==false)&&first.hasNext();temp=first.next()){}
        //此处循环正常情况下结束后temp即为html元素。如果出错，则表现为迭代结束以后temp的tag名字仍不为html，处理如下：
        if(("html".equalsIgnoreCase(temp.tagName())==false)&&!first.hasNext()){
            throw new IndexOutOfBoundsException("document的子元素迭代器已结束");
        }
        //html子元素的迭代器。这里迭代的目的是取其子元素head。
        Iterator<Element> htmlIterator=temp.children().iterator();
        Element head;
        for(head=htmlIterator.next();("head".equalsIgnoreCase(head.tagName())==false)&&htmlIterator.hasNext();head=htmlIterator.next()){}
        //此处循环正常情况下结束后head即为head元素。如果出错，则表现为迭代结束以后head的tag名字仍不为head，处理如下：
        if("head".equalsIgnoreCase(head.tagName())==false&&!htmlIterator.hasNext()){
            throw new IndexOutOfBoundsException("html的子元素迭代器已结束");
        }
        //head子元素的迭代器。这里迭代的目的是取title、keywords、apub:time。
        Iterator<Element> headIterator=head.children().iterator();
        Element title;
        for(title=headIterator.next();("title".equalsIgnoreCase(title.tagName())==false)&&headIterator.hasNext();title=headIterator.next());
        if("title".equalsIgnoreCase(title.tagName())==false&&!headIterator.hasNext()){
            throw new IndexOutOfBoundsException("head的子元素迭代器已结束");
        }
        String ti=title.text();
        Element keywords;
        for(keywords=headIterator.next();("keywords".equalsIgnoreCase(keywords.attr("name"))==false)&&headIterator.hasNext();keywords=headIterator.next());
        if(("keywords".equalsIgnoreCase(keywords.attr("name"))==false)&&!headIterator.hasNext()){
            throw new IndexOutOfBoundsException("head的子元素迭代器已结束");
        }
        String key=keywords.attr("content");
        Element apub_time;
        for (apub_time=headIterator.next();("apub:time".equalsIgnoreCase(apub_time.attr("name"))==false)&&headIterator.hasNext();apub_time=headIterator.next());
        if(("apub:time".equalsIgnoreCase(apub_time.attr("name"))==false)&&!headIterator.hasNext()){
            throw new IndexOutOfBoundsException("head的子元素迭代器已结束");
        }
        String apubtime=apub_time.attr("content");
        System.out.println(ti+"\n"+key+"\n"+apubtime);
    }
}
