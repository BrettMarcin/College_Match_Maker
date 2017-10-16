var models = require('../models/index');


var databaseHandler =  function(){};

databaseHandler.prototype.createCollegeObject = function(theBody){
    var theCollege = null;
    if (theBody.name !== null && theBody.state !== null && theBody.students !== null && theBody.tuition !== null && theBody.rank !== null){
        if (theBody.name !== '' && theBody.state !== '' && theBody.tuition > 0 && theBody.rank > 0){
            theCollege = {
                name: theBody.name,
                state: theBody.state,
                students: theBody.students,
                tuition: theBody.tuition,
                rank: theBody.rank
            };
        }
    }
    return theCollege;
};


module.exports = new databaseHandler();