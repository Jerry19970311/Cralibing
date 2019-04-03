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
