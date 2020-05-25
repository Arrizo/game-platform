function loadFile(id,src,async,loadFuntion)
{
    var js, fjs = document.getElementsByTagName("script")[0];
    //存在
    if (document.getElementById(id)) {
        return;
    }
    //创建节点
    js = document.createElement("script");
    js.id  = id;
    js.src = src;
    js.type="application/javascript";
    js.async=async || true;
    if(loadFuntion){
        js.onload=loadFuntion;
    }

    fjs.parentNode.insertBefore(js, fjs);
}

export default loadFile