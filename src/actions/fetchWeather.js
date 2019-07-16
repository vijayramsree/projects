export function fetchWeather(city){

    return function(dispatch){
        fetch(`http://api.apixu.com/v1/current.json?key=acb226c0e9334014abe53839191207&q=${city}`).then(res => {
            return res.json();
        })
        .then(JSONres => {
            //dispatch the action
            dispatch({type:"FETCH_WEATHER", payload: JSONres})
        }).catch(err => {
            console.log(err);
        })
        
    }
}