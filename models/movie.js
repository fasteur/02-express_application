const Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

// Le schéma est la structure du modèle
// Validation sur save/create par défaut
// pour une validation sur update, ajouter une option {runValidators : true}
// Déclencher une validation sur un objet mongoose déclanche aussi une validation sur les sous-documents
let schema = new Schema({
    fields:{
        directors:[String],
        release_date: String,
        // Min et max = 2 options de validation possibles pr un number 
        rating: {
            type :Number,
            min: 0,
            max:10
        },
        genres: [String],
        image_url:{
            type :String,
            match: /.jpg|.png|.gif$/i // Validation par expression régulière
        },
        plot:{
            type: String,
            minLength: 0,
            maxLength: 10},
        title:{
            type :String,
            // required: true // champ obligatoire avec message d'erreur natif a mongoose
            required : 'Le champ title est obligatoire'// Mongoose comprend qu'il faut valider, et affiche ce message d'erreur là 

        },
        
        rank:{
            type :Number,
            // Validateur custom 
            validate:{
                validator: function(value) {
                    return value < 20;
                }
            },
            message: 'Le champ n\'a pas été  complété correctement'
        },
        running_time_secs: Number,
        actors: [String],
        year: Number,
        production:{
            company: String,
            director: String,
        },
        // production: {
        //     type: Mongoose.SchemaType.ObjectId, // Type spécifique à Mongoose!
        //     ref: 'productions'// référence vers la collection
        // }

    },
    id:String,
    type:String
   
});

module.exports= Mongoose.model('Film',schema);