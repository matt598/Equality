//this will be the mechanics for Sam's and mybb
    var chance;
    var dificulty;
    var userWealth;
    var buisness_Sector = {machine:1, wealth:75, resource:0, happy:.375};//neo-toyoko
    var manufactoring_Sector = {machine:1, wealth:50, resource:0, happy:.25};//CosmoFerguson
    var labor_Sector = {machine:1, wealth:25, resource:0, happy:.125};//Luna-Ohio
    
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
        manufactoring_Sector.wealth += buisness_Sector.resource*2/8;
        labor_Sector.wealth += buisness_Sector.resource*1/8;
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
    
    var moveMonies = function(amount, city){//need to prompt user before hand for city name and amount, in the method call, if it was triggered by the tax method make it negative, if it was taken by the grant button, leave it positive.
        city = city.substring(0,0);//thinks this will limit it to only the 1st char
        city = city.toUpperCase();
        var limit = 0;
        switch (city){
            case "N":
            	var initialWealth =buisness_Sector.wealth;
                if(amount > 0)//giving money
                {
                	if(amount < userWealth){
            		buisness_Sector.wealth +=amount;
                	}
                	else{
                		amount = userWealth;
                		buisness_Sector.wealth +=amount;
                	}
                }
                else//taking money, based off the assumption no one would waste their time with 0 transactions.
                {
                	limit = buisness_Sector.wealth;
                	if(limit < amount){
                		buisness_Sector.wealth -=limit
                		amount = limit;
                	}
                	else{
                		buisness_Sector.wealth +=limit;
                	}
                }
                if(buisness_Sector.wealth < initialWealth)//they lost monies
                {
                	buisness_Sector.happy -= .01 + .5*(1-buisness_Sector.wealth/initialWealth);
                	if(buisness_Sector.happy < 0)
                	{
                		buisness_Sector.happy = 0;
                	}
                }
                else//they make monies
                {
                	buisness_Sector.happy += .25*(1-initialWealth/buisness_Sector.wealth);
                	if(buisness_Sector.happy >1)
                	{
                		buisness_Sector.happy = 1;
                	}
                }
            break;
            case "C":
                var initialWealth =manufactoring_Sector.wealth;
                if(amount > 0)//giving money
                {
                	if(amount < userWealth){
            		manufactoring_Sector.wealth +=amount;
                	}
                	else{
                		amount = userWealth;
                		manufactoring_Sector.wealth +=amount;
                	}
                }
                else//taking money, based off the assumption no one would waste their time with 0 transactions.
                {
                	limit = manufactoring_Sector.wealth;
                	if(limit < amount){
                		manufactoring_Sector.wealth -=limit
                		amount = limit;
                	}
                	else{
                		manufactoring_Sector.wealth +=limit;
                	}
                }
                if(manufactoring_Sector.wealth < initialWealth)//they lost monies
                {
                	manufactoring_Sector.happy -= .01 + .5*(1-manufactoring_Sector.wealth/initialWealth);
                	if(manufactoring_Sector.happy < 0)
                	{
                		manufactoring_Sector.happy = 0;
                	}
                }
                else//they make monies
                {
                	manufactoring_Sector.happy += .25*(1-initialWealth/manufactoring_Sector.wealth);
                	if(manufactoring_Sector.happy >1)
                	{
                		manufactoring_Sector.happy = 1;
                	}
                }
            break;
            case "L"://just have to fix which sector it goes to .
                var initialWealth =labor_Sector.wealth;
                if(amount > 0)//giving money
                {
                	if(amount < userWealth){
            		labor_Sector.wealth +=amount;
                	}
                	else{
                		amount = userWealth;
                		labor_Sector.wealth +=amount;
                	}
                }
                else//taking money, based off the assumption no one would waste their time with 0 transactions.
                {
                	limit = labor_Sector.wealth;
                	if(limit < amount){
                		labor_Sector.wealth -=limit
                		amount = limit;
                	}
                	else{
                		labor_Sector.wealth +=limit;
                	}
                }
                if(labor_Sector.wealth < initialWealth)//they lost monies
                {
                	labor_Sector.happy -= .01 + .5*(1-labor_Sector.wealth/initialWealth);
                	if(labor_Sector.happy < 0)
                	{
                		labor_Sector.happy = 0;
                	}
                }
                else//they make monies
                {
                	labor_Sector.happy += .25*(1-initialWealth/labor_Sector.wealth);
                	if(labor_Sector.happy >1)
                	{
                		labor_Sector.happy = 1;
                	}
                }
            break;
            
            userWealth -=amount;
        }
    }
    
