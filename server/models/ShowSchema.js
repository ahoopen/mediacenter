var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.SchemaTypes.ObjectId;

var EpisodeSchema = new Schema( {
    created : { type : Date, default : Date.now },
    title 	: { type : String, required : true, index : true },
    season 	: { type : Number, required : true, index : true },
    number 	: { type : Number, required : true, index : true },
    summary : { type : String },
    screen	: { type : String },
    location : { type : String }
});

EpisodeSchema.statics.hasEpisode = function(location, season, number) {
    var promise = new mongoose.Promise;

    this.find( { location : location, season : season, number : number } )
        .exec( function(err, result) {
            if(err) {
                promise.error( err );
            }
            var ret = (result.length !== 0) ? promise.complete(true) : promise.complete(false);
        });

    return promise;
};

exports.Episode  = mongoose.model('Episode', EpisodeSchema);

var ShowSchema = new Schema( {
    title	: { type : String, required : true, index : true },
    summary	: { type : String },
    genre	: { type : Array },
    poster	: { type : String },
    episodes: [{ type : ObjectId, ref: "Episode", index : true } ]
});

exports.Show  = mongoose.model('Show', ShowSchema);
