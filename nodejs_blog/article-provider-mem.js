
ArticleProvider = function(){};
ArticleProvider.prototype.dummyData = [];

ArticleProvider.prototype.findAll = function(callback)
{
     callback(null, this.dummyData);
};

ArticleProvider.prototype.findById = function(id,callback) 
{
     var result = null;
     for(var i=0;i<this.dummyData.length; ++i)
     {
          if(this.dummyData[i]._id==id)
          {
               // found
               result = this.dummyData[i];
               break;
          }
     }

     callback(null,result);
}


ArticleProvider.prototype.save = function(articles,callback)
{
     var article = null;
     
     // make sure we deal with array
     if(typeof(articles.length)=="undefined")
     {
          articles = [articles];
     }

     // add articles to dummyData
     for(var i=0; i<articles.length; ++i)
     {
          article = articles[i];

          article._id = i;
          article.created_at = new Date();
     
          if(article.comments===undefined)
          {
               article.comments = [];
          }

          for(var j=0; j<article.comments.length; ++j)
          {
               article.comments[i].created_at = new Date();
          }
          this.dummyData[this.dummyData.length] = article;
     }

     callback(null,articles);
}

// now add sample items
new ArticleProvider().save(
[
     {title:'Sample1', body:'Body', comments:[{author:'Bob',comment:'Yes!'}]},
     {title:'Sample2', body:'Body2'}
]
,function(errror,articles){}
);

// add to exports
exports.ArticleProvider = ArticleProvider;


