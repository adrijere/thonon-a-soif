import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, ScrollView, RefreshControl, TouchableOpacity, AsyncStorage, Image, ImageBackground, Platform} from 'react-native';
import {Container, Text, Button, Toast, Footer} from 'native-base';
import { ProductService } from '../../services/ProductService';
import HeaderTop from '../../components/HeaderTop';
import CardProduct from '../../components/CardProduct';
import CardFilter from '../../components/CardFilter';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import config from '../../config/config';
import styles from './styles';



class Home extends Component {
  static propTypes = {
    alertWithType: PropTypes.func,
    navigation: PropTypes.object,
  }

  static navigationOptions = {
    drawerLabel: 'Mes notifications',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: [],
      filters: []
    };
  }

  async componentDidMount() {
    await this.getMyProducts();
    await this.getMyFilters();
    console.log(this.state);
    this.setState({loading: false});
  }

  formatValues = async(response) => {
    var dict = response.values.slice(1).map(row => row.reduce(function(acc, cur, i) {
      acc[response.values[0][i]] = cur;
      return acc;
    }, {}));

    return dict;
  }

  getMyProducts = async() => {
    await ProductService.getProducts().then(async(response) => {
      console.log(response);
      const products = await this.formatValues(response);
      console.log(products);
      this.setState({products});
    }).catch ((error) => {
      this.setState({loading: false});
    })
  }

  getMyFilters = async() => {
    await ProductService.getFilters().then(async(response) => {
      const filters = await this.formatValues(response);
      this.setState({filters});
    }).catch ((error) => {
      this.setState({loading: false});
    })
  }

  render() {
      return (
        <Container style={styles.container}>
          <HeaderTop title="L'apéro c'est maintenant !" navigation={this.props.navigation} goBack={false}/>
            {this.state.loading ? <Loader/> :
              <View>
                <Text style={styles.title}> Filtrer </Text>
                <ScrollView horizontal>
                  {
                    this.state.filters.map((filter, index) => {
                      return (
                        <CardFilter filter={filter}/>
                      )
                    })
                  }
                </ScrollView>
                <Text style={styles.title}> Produits </Text>
                <ScrollView>
                  {
                    this.state.products.map((product, index) => {
                      return (
                        <CardProduct product={product}/>
                      )
                    })
                  }
                </ScrollView>
              </View>
            }
        </Container>
        );
    }
  }

export default Home;
