import com.google.gson.annotations.SerializedName;

import java.util.List;

public class DataBean{
    private int article_type;
    private String comment_id;
    private int comment_num;
    private String id;
    private IrsImgsBean irs_imgs;
    private String publish_time;
    private String source;
    private String source_id;
    private String title;
    private String url;
    private List<List<String>> tag_label;

    public String getPublish_time() {
        return publish_time;
    }

    public void setPublish_time(String publish_time) {
        this.publish_time = publish_time;
    }

    public int getArticle_type() {
        return article_type;
    }

    public int getComment_num() {
        return comment_num;
    }

    public IrsImgsBean getIrs_imgs() {
        return irs_imgs;
    }

    public String getComment_id() {
        return comment_id;
    }

    public String getId() {
        return id;
    }

    public String getSource() {
        return source;
    }

    public List<List<String>> getTag_label() {
        return tag_label;
    }

    public String getSource_id() {
        return source_id;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }

    public void setArticle_type(int article_type) {
        this.article_type = article_type;
    }

    public void setComment_id(String comment_id) {
        this.comment_id = comment_id;
    }

    public void setComment_num(int comment_num) {
        this.comment_num = comment_num;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setIrs_imgs(IrsImgsBean irs_imgs) {
        this.irs_imgs = irs_imgs;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setSource_id(String source_id) {
        this.source_id = source_id;
    }

    public void setTag_label(List<List<String>> tag_label) {
        this.tag_label = tag_label;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "article_type:"+this.article_type+"\ncomment_id:"+this.comment_id+"\ncomment_num:"+this.comment_num+"\nid:"+this.id+"\nirs_imgs:\n"+this.irs_imgs+"\npublish_time:"+this.publish_time+"\nsource:"+this.source+"\nsource_id:"+this.source_id+"\ntag_label:\n"+this.tag_label+"\ntitle:"+this.title+"\nurl:"+this.url+"\n";
    }

    public class IrsImgsBean{
        @SerializedName("294X195")
        private List<String> _$294X195;

        public List<String> get_$294X195() {
            return _$294X195;
        }

        public void set_$294X195(List<String> _$294X195) {
            this._$294X195 = _$294X195;
        }

        @Override
        public String toString() {
            return "294X195:"+this._$294X195+"\n";
        }
    }
}