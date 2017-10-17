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

databaseHandler.prototype.getSpecificColleges = function(theBody){
    if(theBody.state === 'N/A'){
        return models.College.findAll({
            where: {
                students: {
                    $lte: theBody.size // less than or equal to the size
                },
                tuition: {
                    $lte: theBody.tuition // less than or equal to the size
                }
            }
        });
    } else {
        return models.College.findAll({
            where: {
                students: {
                    $lte: theBody.size // less than or equal to the size
                },
                tuition: {
                    $lte: theBody.tuition // less than or equal to the size
                },
                state: theBody.state
            }
        });
    }
};

module.exports = new databaseHandler();