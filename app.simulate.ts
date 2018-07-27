var mongoose = require('mongoose');
var fullTime = 10*60*60*1000;


//Create a schema - this is like a blueprint
var suitTelemetrySchema = new mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now
    },
  
    heart_bpm: String,
    p_sub: String ,
    p_suit: String,
    t_sub:  String,
    v_fan: String,
    t_eva: String,
    p_o2: String,
    rate_o2: String,
    cap_battery: String,
    p_h2o_g: String,
    p_h2o_l: String,
    p_sop: String,
    rate_sop: String,
    t_battery:String,
    t_oxygen:String,
    t_water:String
});

var SuitData = mongoose.model('x15Suit', suitTelemetrySchema);

module.exports.suitTelemetry = function(t, x){
    var itemOne = SuitData({
        heart_bpm: heartBeat(),
        p_sub: pressureSUB(),
        p_suit: pressureSuit(),
        t_sub: tempSub(),
        v_fan: velocFan(x),
        p_o2:pressureOxygen(),
        rate_o2:rateOxygen(),
        cap_battery:capacityBattery(),
        p_h2o_g:pressureWaterGas(),
        p_h2o_l:pressureWaterLiquid(),
        p_sop:pressureSOP(),
        rate_sop:rateSOP(),
        t_battery:batteryLife(t),
        t_oxygen:oxygenLife(t),
        t_water:waterLife(t)
        }).save(function(err){
        if (err) throw (err); 
    });
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var time = h + ':' + m + ':' + s;
    return time
}

function pressureSuit(){
    this.max = 4.00; 
    this.min = 3.92; 
    this.p_suit = Math.random() * (this.max - this.min) + this.min;
    return this.p_suit.toFixed(2); 
};

function batteryLife(t){  
    var elapsed = Date.now() - t;
   this.t_remaining = fullTime - (elapsed*10); 
   this.t_battery = secondsToHms(Math.floor(this.t_remaining/1000));
    console.log(Math.floor(elapsed/1000) + ' s');
    return this.t_battery; 
};

function oxygenLife(t){  
    var elapsed = Date.now() - t;
    this.t_remaining = fullTime - elapsed; 
    this.t_oxygen = secondsToHms(Math.floor(this.t_remaining/1000));
    return this.t_oxygen;
};

function waterLife(t){  
    var elapsed = Date.now() - t;
    this.t_remaining = fullTime - elapsed; 
    this.t_water = secondsToHms(Math.floor(this.t_remaining/1000));
    return this.t_water; 
};

function heartBeat(){
    this.max = 75; 
    this.min = 62; 
    this.heart_bpm = Math.random() * (this.max - this.min) + this.min;
    return this.heart_bpm.toFixed(0); 
};

function pressureSUB(){
    this.max = 2.5;
    this.min = 2.3; 
    this.p_sub = Math.random() * (this.max - this.min) + this.min;
    return this.p_sub.toFixed(2); 
};

function tempSub(){
    this.max = 6; 
    this.min = 4; 
    this.t_sub = Math.random() * (this.max - this.min) + this.min;
    return this.t_sub.toFixed(0); 
};

function velocFan(x){
    if (x === true){ 
        if (this.v_fan > 2000){
            this.v_fan = this.v_fan - 960;   
            return this.v_fan.toFixed(0); 
        }
        this.max = 1789; 
        this.min = 879;
    } else {
        this.max = 40000; 
        this.min = 39900; 
    }

    this.v_fan = Math.random() * (this.max - this.min) + this.min;

    return this.v_fan.toFixed(0); 
};

function pressureOxygen(){
    this.max = 950; 
    this.min = 935; 
    this.p_o2 = Math.random() * (this.max - this.min) + this.min;
    return this.p_o2.toFixed(0); 
};

function rateOxygen(){
    this.max = 1; 
    this.min = 0.8; 
    this.rate_o2 = Math.random() * (this.max - this.min) + this.min;
    return this.rate_o2.toFixed(1); 
};

function capacityBattery(){
    this.max = 30; 
    this.min = 29.4; 
    this.cap_battery = Math.random() * (this.max - this.min) + this.min;
    return this.cap_battery.toFixed(0); 
};

function pressureWaterGas(){
    this.max = 16; 
    this.min = 15; 
    this.p_h2o_g = Math.random() * (this.max - this.min) + this.min;
    return this.p_h2o_g.toFixed(0); 
};

function pressureWaterLiquid(){
    this.max = 16; 
    this.min = 15; 
    this.p_h2o_l = Math.random() * (this.max - this.min) + this.min;
    return this.p_h2o_l.toFixed(0); 
};

function pressureSOP(){
    this.max = 950; 
    this.min = 850; 
    this.p_sop = Math.random() * (this.max - this.min) + this.min;
    return this.p_sop.toFixed(0); 
};

function rateSOP(){
    this.max = 1; 
    this.min = 0.9; 
    this.rate_sop = Math.random() * (this.max - this.min) + this.min;
    return this.rate_sop.toFixed(1); 
};

//Function to return all data from the database
module.exports.getSuitTelemetry = function (callback, limit) {
	SuitData.find({},{_id:0, __v:0},callback);
}

//Function to return the most recently created dataset
module.exports.getSuitTelemetryByDate = function (callback, limit) {
	SuitData.find({},{_id:0, __v:0},callback).sort({'create_date':-1}).limit(1);
}