import React from 'react';



class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = {likesCount : 0};
    this.onJoin = this.onJoin.bind(this);
  
  }

  onJoin () {
      this.setState({likesCount: this.state.likesCount + 1});
   
  }






  render() {
    return (
      <div>
        The beauty count is {this.state.likesCount}
        <div><button onClick={this.onJoin}>Join Bid</button></div>
      
      </div>
    );
  }

}

export default AwesomeComponent;