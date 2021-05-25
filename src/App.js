import React from 'react';
import axios from 'axios';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      locationData:'',
      displayMap:false,
      errorMsg:false
    }
  }

  showLocation = async(e) =>{
    e.preventDefault();

    let LocationUrl = `https://eu1.locationiq.com/v1/search.php?key=pk.d23c6e6184e88db391adb051f39a989c&q=${this.state.search}&format=json`;

    try {
      let locResult = await axios.get(LocationUrl);
      // console.log(locResult.data[0]);
      
      this.setState({
        locationData:locResult.data[0],
        displayMap:true
      })
  
      console.log(this.state.locationData);
    }
    catch {
      this.setState({
        displayMap:false,
        errorMsg:true
      })
    }

  }


  updateSearch = (event) =>{
    this.setState({
      search: event.target.value
    })
    console.log(this.state.search);
  }
render(){
  return(
    <>
      <h1>city explorer </h1>
      <form onSubmit={this.showLocation}>
      <input type='text' placeholder='add a city' onChange={this.updateSearch}/>
      <input type='submit' value='Get Location'/>




      </form>
      <p>{this.state.locationData.display_name}</p>
      
      { this.state.displayMap &&
        <img
        src={`https://maps.locationiq.com/v3/staticmap?key=pk.d23c6e6184e88db391adb051f39a989c&center=${this.state.locationData.lat},${this.state.locationData.lon}`} alt=''
        />
      }
    </>
  )
}
}

export default App;