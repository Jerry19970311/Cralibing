import com.google.gson.annotations.SerializedName;

import java.util.List;

public class NewsList {
    private int biz;
    private int code;
    private List<DataBean> data;
    private String msg;
    private String seq;

    public String getSeq() {
        return seq;
    }

    public int getCode() {
        return code;
    }

    public int getBiz() {
        return biz;
    }

    public List<DataBean> getData() {
        return data;
    }

    public String getMsg() {
        return msg;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setBiz(int biz) {
        this.biz = biz;
    }

    public void setData(List<DataBean> data) {
        this.data = data;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        return "biz:"+this.biz+"\ncode:"+this.code+"\ndata:\n"+this.data+"\nmsg:"+this.msg+"\nseq:"+this.seq+"\n";
    }
}
