import ReactDOM from "react-dom";
import ApolloProvider from "./utils/ApolloProvider";
import './index.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Fira Sans: 300, 400, 500, 700', 'sans-serif']
  }
})

ReactDOM.render(ApolloProvider, document.getElementById("root"));
