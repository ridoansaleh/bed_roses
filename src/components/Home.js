import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../redux/store";
import '../styles/Home.scss'

class Home extends React.Component {

  componentDidMount() {
    if (this.props.countries.length <= 0) {
      this.props.fetchData( );
    }
  }

  render() {
    const { countries } = this.props;

    return (
      <div>
        <h2>Countries</h2>
        <ul>
          {countries.map(({ id, name }) => (
            <li key={id}> {name} </li>
          ))}
        </ul>
      </div>
    );
  }
}

Home.serverFetch = fetchData; // static declaration of data requirements

const mapStateToProps = (state) => ({
  countries: state.data,
});

const mapDispatchToProps = {
  fetchData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
