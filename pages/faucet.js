import React, {Component} from 'react';
import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';

const CONTRACT_ADDRESS = TOKEN_CONTRACT_ADDRESS;
const privkey = PRIVATE_KEY_TOKEN_OWNER;
let provider = new HDWalletProvider(RECOVERY_PHARSE_TOKEN_OWNER, "https://data-seed-prebsc-1-s1.binance.org:8545/");
const initialSupply = 100000000; // inital supply for calculate funded amount


let web3 = new Web3(provider);
const ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
let argontoken = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
export default class Home extends Component {
  state = {
    isOpen: false,
    show: false,
    percent: 6,
    text: "sending tokens...",
    address: "0x0000000000000000000000000000000000",
    addressInput: "",
    funded: 0
  }

  dropdown = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  setInput = (e) => {
    this.setState({addressInput: e.target.value});
  }

  setFunded = async () => {
    const _totalSupply = await argontoken.methods.totalSupply().call();
    const totalSupply = Number(_totalSupply / 1000000000000000000);
    const funded = Number(totalSupply - initialSupply).toFixed(2);

    this.setState({
      funded: funded
    });
  }
  setPending = (address) => {
    this.setState({
      address: address,
      show: true,
      percent: 6,
      text: "sending tokens...",
    })
  }

  setSuccess = (address) => {
    this.setState({
      address: address,
      show: true,
      percent: 100,
      text: "sent!",
    })
  }


  setError = (address) => {
    this.setState({
      address: address,
      show: true,
      percent: 100,
      text: "error!!!",
    })
  }

  sendArgon = async (amount) => {
    const accounts = await web3.eth.getAccounts();
    const balance = await argontoken.methods.balanceOf(accounts[0]).call();
    this.setPending(this.state.addressInput);
    this.setFunded();

    const tx = {
      from: accounts[0],
      to: CONTRACT_ADDRESS,
      gas: 999999,
      data: argontoken.methods.mint(amount).encodeABI()
    }
    const signPromise = web3.eth.accounts.signTransaction(tx, privkey).then((signedTx) => {
      const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
      sentTx.on("receipt", receipt => {
        this.setState({percent: "47"});
        const tx = {
          from: accounts[0],
          to: CONTRACT_ADDRESS,
          gas: 999999,
          data: argontoken.methods.transfer(this.state.addressInput, amount).encodeABI()
        }
        
        const signPromise = web3.eth.accounts.signTransaction(tx,privkey).then((signedTx) => {
          const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

          sentTx.on("receipt", receipt => {
            this.setSuccess(this.state.addressInput);
            this.setFunded();

          });


          sentTx.on("error", err => {
            console.log(err, "error");
            this.setError(this.state.addressInput);
            this.setFunded();

          })

        });
      });

      sentTx.on("error", err => {
        console.log(err, "error");
        this.setError(this.state.addressInput);
        this.setFunded();

      })
      });

    this.dropdown();
  }
  render() {
    const {isOpen, show, address, percent, text, funded} = this.state
  return (
    <>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Argon: Faucet</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <style dangerouslySetInnerHTML={{__html: "\n\t\t\t.vertical-center {\n\t\t\t\tmin-height: 100%;\n\t\t\t\tmin-height: 100vh;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\t\t\t.progress {\n\t\t\t\tposition: relative;\n\t\t\t}\n\t\t\t.progress span {\n\t\t\t\tposition: absolute;\n\t\t\t\tdisplay: block;\n\t\t\t\twidth: 100%;\n\t\t\t\tcolor: white;\n\t\t\t }\n\t\t\t pre {\n\t\t\t\t padding: 6px;\n\t\t\t\t margin: 0;\n\t\t\t }\n\t\t" }} />
    <div className="vertical-center">
      <div className="container">
        <div className="row" style={{marginBottom: 16}}>
          <div className="col-lg-12">
            <h1 style={{textAlign: 'center'}}><i className="fa fa-bath" aria-hidden="true" /> Argon Testnet Faucet</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
            <div className="input-group">
              <input id="url" name="url" onChange={this.setInput.bind(this)} type="text" className="form-control" placeholder="Input your Binance Smart Chain address..." />
              <span className={isOpen ? "input-group-btn open" : "input-group-btn"}>
                <button className="btn btn-default dropdown-toggle" onClick={this.dropdown} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Give me ARGON	</button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li><a style={{textAlign: 'center'}} onClick={this.sendArgon.bind(this,"100000000000000000000")}>100 ARGON</a></li>
                  <li><a style={{textAlign: 'center'}} onClick={this.sendArgon.bind(this,"1000000000000000000000")}>1.000 ARGON</a></li>
                  <li><a style={{textAlign: 'center'}} onClick={this.sendArgon.bind(this,"100000000000000000000000")}>100.000 ARGON</a></li>
                </ul>
              </span>
            </div>
          </div>
        </div>
        


        {show ? 
        <div className="row" style={{marginTop: 32}}>
          <div className="col-lg-6 col-lg-offset-3">
            <div className="panel panel-small panel-default">
              <div className="panel-body" style={{padding: 0, overflow: 'auto', maxHeight: 300}}>
                <table id="requests" className="table table-condensed" style={{margin: 0}}><tbody><tr id="0xfdcdd99a26b072237d8bb3a9ec7955331974c01813afd3ae8b10d2c54b8fd7ae">  <td><div style={{background: 'url("")', backgroundSize: 'cover', width: 32, height: 32, borderRadius: 4}} /></td>  <td><pre>{address}</pre></td>  <td style={{width: '100%', textAlign: 'center', verticalAlign: 'middle'}}>    <span id="time-1" className="timer">{text}</span>    <div className="progress" style={{height: 4, margin: 0}}>      <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow={2} style={{width: `${percent}%`}} />  </div></td></tr></tbody></table>
              </div>
              <div className="panel-footer">
                <table style={{width: '100%'}}><tbody><tr>
                      <td style={{textAlign: 'center'}}><i className="fa fa-rss" aria-hidden="true" /> <span id="peers">1</span> peers</td>
                      <td style={{textAlign: 'center'}}><i className="fa fa-university" aria-hidden="true" /> <span id="funded">{funded}</span> funded</td>
                    </tr></tbody></table>
              </div>
            </div>
          </div>
        </div>
        : null}
        <br />
        <div className="row justify-content-center align-items-center">
        <a href="https://argon.run">back site..</a>
        </div>
        
      </div>
    </div>
  </>
  
  )
}
}
