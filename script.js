//this will be the mechanics for Sam's and mybb
    var chance;
    var difficulty;
    var userWealth = 100;
    var business_Sector = {machine:1, wealth:75, resource:0, happy:.375};//neo-toyoko
    var manufacturing_Sector = {machine:1, wealth:50, resource:0, happy:.25};//CosmoFerguson
    var labor_Sector = {machine:1, wealth:25, resource:0, happy:.125};//Luna-Ohio
	

    
    //primary();
    var randomEvent = function(chance){
        var eventThatHappens = function(city){}
        eventThatHappens(Math.floor(3*Math.random()+1));
    };
    
    var passTime = function(numberOfTurns){
        labor_Sector.resource+=labor_Sector.happy*labor_Sector.machine*numberOfTurns;
        manufacturing_Sector.resource+=labor_Sector.resource*manufacturing_Sector.happy*manufacturing_Sector.machine*numberOfTurns/2;
        labor_Sector.resource = 0;
        business_Sector.resource+= manufacturing_Sector.resource*business_Sector.happy*business_Sector.machine*numberOfTurns/2;
        manufacturing_Sector.resource = 0;
        business_Sector.wealth += business_Sector.resource*3/8;     
        manufacturing_Sector.wealth += business_Sector.resource*2/8;
        labor_Sector.wealth += business_Sector.resource*1/8;
        userWealth += business_Sector.resource*2/8;
        business_Sector.resource =0;//all that stuff above does da resources
        //does a randomEvent test for every turn the user advances.
        for(var i = 0; i < numberOfTurns; i++){
            //basically 1 in 4 chance of a random event
            if(Math.random()<.25){
                randomEvent(chance);
            }
        }
		//Display Data on Page
		show();
		
    };
	
	function show(){ // Updates Numbers in HTML to those in the program.
		document.getElementById("Funds").innerHTML = "Current Funds:" + userWealth.toString();
		
		document.getElementById("HighWealth").innerHTML = business_Sector.wealth.toString();
		document.getElementById("HighHappy").innerHTML = business_Sector.happy.toString();
		document.getElementById("HighMachine").innerHTML = business_Sector.machine.toString();
		
		document.getElementById("MidWealth").innerHTML = manufacturing_Sector.wealth.toString();
		document.getElementById("MidHappy").innerHTML = manufacturing_Sector.happy.toString();
		document.getElementById("MidMachine").innerHTML = manufacturing_Sector.machine.toString();
		
		document.getElementById("LowWealth").innerHTML = labor_Sector.wealth.toString();
		document.getElementById("LowHappy").innerHTML = labor_Sector.happy.toString();
		document.getElementById("LowMachine").innerHTML = labor_Sector.machine.toString();
		};
    
    var moveMonies = function(amount, city){//need to prompt user before hand for city name and amount, in the method call, if it was triggered by the tax method make it negative, if it was taken by the grant button, leave it positive.
        city = city.toString().substring(0,0);//thinks this will limit it to only the 1st char
        city = city.toUpperCase();
        var limit = 0;
        switch (city){
            case "N":
            	var initialWealth =business_Sector.wealth;
                if(amount > 0)//giving money
                {
                	if(amount < userWealth){
            		business_Sector.wealth +=amount;
                	}
                	else{
                		amount = userWealth;
                		business_Sector.wealth +=amount;
                	}
                }
                else//taking money, based off the assumption no one would waste their time with 0 transactions.
                {
                	limit = business_Sector.wealth;
                	if(limit < amount){
                		business_Sector.wealth -=limit
                		amount = limit;
                	}
                	else{
                		business_Sector.wealth +=limit;
                	}
                }
                if(business_Sector.wealth < initialWealth)//they lost monies
                {
                	business_Sector.happy -= .01 + .5*(1-business_Sector.wealth/initialWealth);
                	if(business_Sector.happy < 0)
                	{
                		business_Sector.happy = 0;
                	}
                }
                else//they make monies
                {
                	business_Sector.happy += .25*(1-initialWealth/business_Sector.wealth);
                	if(business_Sector.happy >1)
                	{
                		business_Sector.happy = 1;
                	}
                }
            break;
            case "C":
                var initialWealth =manufacturing_Sector.wealth;
                if(amount > 0)//giving money
                {
                	if(amount < userWealth){
            		manufacturing_Sector.wealth +=amount;
                	}
                	else{
                		amount = userWealth;
                		manufacturing_Sector.wealth +=amount;
                	}
                }
                else//taking money, based off the assumption no one would waste their time with 0 transactions.
                {
                	limit = manufacturing_Sector.wealth;
                	if(limit < amount){
                		manufacturing_Sector.wealth -=limit;
                		amount = limit;
                	}
                	else{
                		manufacturing_Sector.wealth +=limit;
                	}
                }
                if(manufacturing_Sector.wealth < initialWealth)//they lost monies
                {
                	manufacturing_Sector.happy -= .01 + .5*(1-manufacturing_Sector.wealth/initialWealth);
                	if(manufacturing_Sector.happy < 0)
                	{
                		manufacturing_Sector.happy = 0;
                	}
                }
                else//they make monies
                {
                	manufacturing_Sector.happy += .25*(1-initialWealth/manufacturing_Sector.wealth);
                	if(manufacturing_Sector.happy >1)
                	{
                		manufacturing_Sector.happy = 1;
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
        };
		
		var grant = function(){
			var inpCity = prompt("Enter City Name");
			var inpAmount = prompt("Enter Amount to Give");
			console.log("GrantRunning");
			moveMonies(inpAmount, inpCity);
		};
		var tax = function(){
			var inpCity = prompt("Enter City Name");
			var inpAmount = prompt("Enter Amount to Take");
			console.log("Tax Running");
			moveMonies(inpAmount, -1* inpCity);
		};
		
		
			
    
    
