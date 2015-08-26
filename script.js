//this will be the mechanics for Sam's and mybb
    var chance = .5;
    var difficulty;
	var week = 0;
    var userWealth = 25;
    var business_Sector = {machine:1, wealth:60, resource:0, happy:80, name: "Neo-Tokyo"};//neo-toyoko
    var manufacturing_Sector = {machine:1, wealth:35, resource:0, happy:60, name: "CosmoFerguson"};//CosmoFerguson
    var labor_Sector = {machine:1, wealth:25, resource:0, happy:50, name: "Luna-Ohio"};//Luna-Ohio
	var country = [labor_Sector, manufacturing_Sector, business_Sector];
	var acted = false;
	var statements = "";
    
    //primary();
    var randomEvent = function(){
        var city = (Math.floor(3*Math.random()));
        eventThatHappens(Math.floor(3*Math.random()+1));
        console.log("A random event happened")
        console.log("Event " + eventThatHappens + " happened")
        switch(eventThatHappens)
        {
        	case 1://lose money
        		country[city].wealth = country[city].wealth * .5*chance;
        		tellPlayer(country[city].Name + " found out some of their coins were just chocolate wrapped in foil")
        		chance -=.05;
        	break;
        	case 2://gain money
        		country[city].wealth = country[city].wealth * (1 + .5*(1-chance));
        		tellPlayer(country[city].Name + " found some extra cash between their couch cushions");
        	break;
        	case 3:
        		country[city].happy = country[city].happy * .5*chance;
        		tellPlayer(country[city].Name + "'s builboard got hacked and displayed dank memes");
        	break;
        	case 4:
        		country[city].happy = country[city].happy * (1 + .5*(1-chance));
        		if(country[city].happy > 100)
        		{
        			country[city].happy = 100;
        		}
        		tellPlayer(country[city].Name + "'s builboard displayed some fresh memes");
        	break;
        	case 5:
        		country[city].machine = country[city].machine * .5*chance;
        		tellPlayer(country[city].Name + "'s machines rusted some");
        	break;
        	case 6:
        		country[city].machine = country[city].machine * (1 + .5*(1-chance));
        		tellPlayer(country[city].Name + "'s machines got maintainced.");
        	break;
        	default:
        	break;
        }
    };
    
	function tellPlayer(string){
	statements += string + "\n \n";
	}
	
	function wealthGap(upperSector, lowerSector){ // Calculates Wealth Gap and effects happiness accordingly
		var wealthGap = Math.floor((upperSector.wealth-lowerSector.wealth)/lowerSector.wealth);
		if(wealthGap > -1*wealthGap){ //Ensures no gain in happiness from inequality
			lowerSector.happy -= wealthGap;
			tellPlayer(lowerSector.name + " is unhappy about the wealth gap between them and " + upperSector.name);
			}
	};
	
	function checkMinMax(sector){ // Makes sure that no sectors have negative values or those that exceed the bounds
		for (key in sector){
			if(!isNaN(sector[key])){
				if(sector[key] < 0){
					sector[key] = 0;
				}else if(  key === "happy" && sector[key] > 100){
					sector[key] = 100;
				}
			}
		}
	};
	
    var passTime = function(numberOfTurns){
		week++;
		statements = "";
		
        labor_Sector.resource+=labor_Sector.happy*labor_Sector.machine*numberOfTurns/10;
        manufacturing_Sector.resource+=labor_Sector.resource*manufacturing_Sector.happy*manufacturing_Sector.machine*numberOfTurns/20;
        labor_Sector.resource = 0;
        business_Sector.resource+= manufacturing_Sector.resource*business_Sector.happy*business_Sector.machine*numberOfTurns/20;
        manufacturing_Sector.resource = 0;
        business_Sector.wealth += business_Sector.resource*5.25/10;     
        manufacturing_Sector.wealth += business_Sector.resource*2.5/10;
        labor_Sector.wealth += business_Sector.resource*1/10;
		
		//Wealth Gap effects happiness
		wealthGap(manufacturing_Sector, labor_Sector);
		wealthGap(business_Sector, manufacturing_Sector);
			
		// Ensures no Negative Values for Sector resources
		checkMinMax(business_Sector);
		checkMinMax(manufacturing_Sector);
		checkMinMax(labor_Sector);
		
		
       // userWealth += business_Sector.resource*2/8;
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
		acted = false;
		
    };
	
	function show(){ // Updates Numbers in HTML to those in the program.
		document.getElementById("Funds").innerHTML ="Current Funds: " + Math.floor(userWealth) + "<br> Week: " + week;
		
		document.getElementById("HighWealth").innerHTML = Math.floor(business_Sector.wealth);
		document.getElementById("HighHappy").innerHTML = business_Sector.happy.toFixed(2);
		document.getElementById("HighMachine").innerHTML = business_Sector.machine;
		
		document.getElementById("MidWealth").innerHTML = Math.floor(manufacturing_Sector.wealth);
		document.getElementById("MidHappy").innerHTML = manufacturing_Sector.happy.toFixed(2);
		document.getElementById("MidMachine").innerHTML = manufacturing_Sector.machine;
		
		document.getElementById("LowWealth").innerHTML = Math.floor(labor_Sector.wealth);
		document.getElementById("LowHappy").innerHTML = labor_Sector.happy.toFixed(2);
		document.getElementById("LowMachine").innerHTML = labor_Sector.machine;
		
		document.getElementById("status").innerHTML = statements;
		console.log("Updated");
		
		};
    
	var moveMonies = function(amount, city){
		if (acted){
			alert("You have already acted this turn");
			return;
		}
		city = city.toString().charAt(0); // Shortens user input to make it match up easy
		city = city.toUpperCase();
		for(var i = 0; i < country.length; i++){ // searches through country for name of Sector
			if( country[i].name.charAt(0) === city){
				var initialWealth = country[i].wealth; //saves the initial wealth of the sector for happiness calculations
			
				if(amount > userWealth){ // Makes sure the player doesn't give more money than they have.
						amount = userWealth;
				}else if(-1 * amount > country[i].wealth){//Makes sure you don't take more money from the sector than they have 
						amount = -1 * country[i].wealth;
				}
				
				if ( amount > 0){ // Giving money to a city,

                	country[i].wealth += amount; //adjusts amount of money the sector has
					userWealth -= amount; // and how much the player has.
					
					country[i].happy += 25*(1- initialWealth/country[i].wealth); //Makes the target happier, they got money!
					acted = true;
					
				} else if (amount < 0){ // Taking money from a city
					
					country[i].wealth += amount; // takes money from the city (adds a negative number)
					userWealth -= amount; //and gives to the player
					
					country[i].happy -= 1 + 60*(1-country[i].wealth/initialWealth); // Takes away their happiness, taxing tends to do that.
					acted = true;
				} else{
					alert("No money was transferred, you can still act this turn.");
				}
				checkMinMax(country[i])
					
			
			}else if (i === country.length - 1 && !acted){
				alert("No such city was found");
			}
		}
	};
		var grant = function(){
		if(!acted)
		{
			if (userWealth < 1){
				alert("You do not have any money to give!");
				return;
			}
			var inpCity = prompt("Enter City Name");
			var inpAmount = parseInt(prompt("Enter Amount to Give"));
			console.log("GrantRunning");
			moveMonies(inpAmount, inpCity);
			show();
			}
			else{
			alert("You have already acted this turn.");
			}
		};
		
		var tax = function(){
		if(!acted){
			var inpCity = prompt("Enter City Name");
			var inpAmount = parseInt(prompt("Enter Amount to Take"));
			
			console.log("Tax Running");
			moveMonies(-1* inpAmount, inpCity);
			show();
			}
			else{
			alert("You have already acted this turn.");
			}
		};
		
		
			
    
    
