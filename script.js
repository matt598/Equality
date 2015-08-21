//this will be the mechanics for Sam's and mybb
    var chance;
    var dificulty;
    var userWealth;
    var buisness_Sector = {machine:1, wealth:75, resource:0, happy:.375};
    var manufactoring_Sector = {machine:1, wealth:50, resource:0, happy:.25};
    var labor_Sector = {machine:1, wealth:25, resource:0, happy:.125};
    
    primary();
    var randomEvent = function(chance){
        var eventThatHappens = function(city){}
        eventThatHappens(Math.floor(3*Math.random()+1)
    }
    
    var passTime = function(numberOfTurns){
        labor_Sector.resource+=labor_Sector.happy*labor_Sector.machine*numberOfTurns;
        manufactoring_Sector.resource+=labor_Sector.resource*manufactoring_Sector.happy*manufactoring_Sector.machine*numberOfTurns/2;
        labor_Sector.resource = 0;
        buisness_Sector.resource+= manufactoring_Sector.resource*buisness_Sector.happy*buisness_Sector.machine*numberOfTurns/2;
        manufactoring_Sector.resource = 0;
        buisness_Sector.wealth += buisness_Sector.resource*3/8;     
        buisness_Sector.wealth += buisness_Sector.resource*2/8;
        buisness_Sector.wealth += buisness_Sector.resource*1/8;
        userWealth += buisness_Sector.resource*2/8;
        buisness_Sector.resource =0;//all that stuff above does da resources
        //does a randomEvent test for every turn the user advances.
        for(var i = 0; i < numberOfTurns; i++){
            //basically 1 in 4 chance of a random event
            if(Math.random()<.25){
                randomEvent(chance);
            }
        }
    }
    
    var takeMonies = function(amount, city){
        
    }
    var giveMonies = function(amount, city){
        
    }
    
