import React from 'react'
import {
  TouchableOpacity,
  View, StyleSheet, Text
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageLoad from '../common/RnImagePlaceH'
import { appTextStyle } from './Theme.style'
import HTML from 'react-native-render-html'
import Counter from '../common/Counter'
import Button from '../common/Button'

const groupCard = ({
  data, themeStyle, sessionId, settings, language,
  deleteProductFromCartCall, th,
  index
}) => (
  <View
    key={index}
    style={[styles.cartCardContainer, {
      backgroundColor: themeStyle.secondryBackgroundColor
    }]}>
    <View style={styles.cartCardView}>
      {data.images !== undefined
        ? <ImageLoad
          key={1}
          style={styles.productsImage}
          source={{ uri: data.images[0].src }}
        />
        : <ImageLoad
          key={1}
          style={styles.productsImage}
          source={require('../images/avatar.png')}
        />
      }

      <View>
        <Text style={[styles.priceText, {
          color: themeStyle.textColor,
          fontSize: appTextStyle.largeSize,
          marginLeft: -4,
          fontWeight: 'bold',
          fontFamily: appTextStyle.fontFamily,
          marginBottom: 5
        }]}>
          {data.name}
        </Text>

        <HTML
          html={
            data.price_html
          }
          baseFontStyle={{
            fontSize: appTextStyle.mediumSize,
            color: themeStyle.textColor.Counter
          }}
          alterNode={node => {
            const { name } = node
            if (
              name === 'ins' &&
              node.children[0] !== undefined &&
              node.children[0] !== null
            ) { 

              if (
                name === 'ins' &&
                node.children[0].children[0] !== undefined &&
                node.children[0].children[0] !== null
              ) {
                if (node.children[0].children[0].children === undefined) {
                  if (
                    name === 'ins' &&
                    node.children[0].children[0].data !== undefined
                  ) {

                    node.children[0].children[0].data = `${' - ' + node.children[0].children[0].data}`
                    return node
                  }
                } else {
                  if (
                    name === 'ins' &&
                    node.children[0].children[0].children[0].data !== undefined
                  ) {
                    node.children[0].children[0].children[0].data = `${' - ' + node.children[0].children[0].children[0].data}`
                    return node
                  }
                }
              }
            }
          }}
          tagsStyles={{
            ins: {
              color: themeStyle.textColor,
              fontSize: appTextStyle.mediumSize
            },
            del: {
              textDecorationLine: 'line-through',
              fontSize: appTextStyle.mediumSize,
              color: 'gray',
              fontWeight: '300'
            }
          }}
        />

        <View style={{ marginTop: 10 }} />
        {data.type === 'variable'
          ? <Button onPress={() => {
            th.props.navigation.push(
              'ProductDetails',
              {
                objectArray: data
              }
            )
          }}
            borderRadius={true}
            disable={true} themeStyle={themeStyle}
            navigation={th.props.navigation}
            title={th.props.language.Details}
            WIDTH={'60%'}
            HEIGHT={5}
          ></Button>
          : <Counter
            innerRef={stepper => {
              th.stepper = stepper
            }}
            minimumValue={0}
            initialValue={th.state.quantityNumber}
            width={33}
            containerWidth={80}
            height={1}
            onDecrement={value =>
              th.qunatityGroupMinus(data)
            }
            onIncrement={value =>
              th.qunatityGroupPlus(data)
            }
          />
        }
      </View>
    </View>

    {deleteProductFromCartCall
      ? <TouchableOpacity onPress={() => {
        th.setState({ spinnerTemp: true }, () => {
          deleteProductFromCartCall(data.product_id,
            sessionId, data.product_combination_id,
            data.qty, th)
        })
      }}>
        <FontAwesome
          name={'trash'}
          style={{
            color: themeStyle.iconPrimaryColor,
            transform: [{ rotateY: '180deg' }],
            fontSize: appTextStyle.largeSize + 2
          }}
        />
      </TouchableOpacity>
      : null}
  </View>
)

/// //////////////////////////////////////////
export default groupCard

const styles = StyleSheet.create({

  cartCardView: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  cartCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2'
  },
  productsImage: {
    height: 68,
    width: 65,
    overflow: 'hidden',
    marginRight: 10,
    borderRadius: appTextStyle.customRadius - 7
  }
})
