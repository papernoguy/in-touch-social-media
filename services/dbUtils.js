const saveModel = (modelInstance, res) => {
    modelInstance.save()
        .then(() => {
            return res.send("new record created");
        })
        .catch(err => {
            console.log(err);
            return res.send("error: save to db");
        });
};

module.exports = {
    saveModel,
};
