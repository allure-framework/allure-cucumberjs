function Logger(){
    var logs = [];
    return {
        logMessage : function(msg){
            logs.push(msg);
        },
        getMessages : function(){
            return logs;
        },
        clearMessages : function(){
            logs = [];
        }
    }
}

module.exports = Logger();