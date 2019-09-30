import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Card, CardItem, Text, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../i18n/i18n';
import Moment from 'moment/min/moment-with-locales';
import styles from './styles';


const CardProduct = (props) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.left}>
          <View>
            <Image
              style={styles.image}
              source={{uri: props.product.product_picture}}
              />
          </View>
          <View>
            <Text style={styles.title}>{props.product.name}</Text>
            <Text style={styles.info}>{props.product.category} - {props.product.quantity}</Text>
            <Text style={styles.price}>{props.product.price}€</Text>
          </View>
        </View>
        <View>
          <Text>+</Text>
        </View>
      </TouchableOpacity>
    )
  return null;
};

CardProduct.propTypes = {
  product: PropTypes.array,
};

export default CardProduct;
