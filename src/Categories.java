import java.util.ArrayList;
import java.util.List;

public class Categories {
    private int biz;
    private int code;
    private List<Data> data;
    private int datanum;
    private String seq;

    public Categories(){
    }
    public int getBiz() {
        return biz;
    }

    public int getCode() {
        return code;
    }

    public List<Data> getData() {
        return data;
    }

    public int getDatanum() {
        return datanum;
    }

    public String getSeq() {
        return seq;
    }

    public void setBiz(int biz) {
        this.biz = biz;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setDatanum(int datanum) {
        this.datanum = datanum;
    }

    public void setDatas(List<Data> data) {
        this.data = data;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

    @Override
    public String toString() {
        return "biz:"+this.biz+"\ncode:"+this.code+"\ndata:"+this.data+"\ndatanum:"+this.datanum+"\nseq:"+this.seq;
    }

    public class Data {
        private String chn;
        private String cid;
        private String name;
        public Data(){}
        public Data(String chn,String cid,String name){
            this.chn=chn;
            this.cid=cid;
            this.name=name;
        }

        public String getChn() {
            return chn;
        }

        public String getCid() {
            return cid;
        }

        public String getName() {
            return name;
        }

        public void setChn(String chn) {
            this.chn = chn;
        }

        public void setCid(String cid) {
            this.cid = cid;
        }

        public void setName(String name) {
            this.name = name;
        }

        @Override
        public String toString() {
            return "chn:"+this.chn+"-cid:"+this.cid+"-name:"+this.name+"\n";
        }
    }

}
