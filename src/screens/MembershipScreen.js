import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import MembershipComponent from './MembershipComponent';
import {connect} from 'react-redux';
import {getHttp, getUrl} from '../common/WooComFetch';
import {
  addSearchValue,
  clearSearchValue,
  removeWishlistProductId,
} from '../redux/actions/actions';
import {createSelector} from 'reselect';
import {useSelector} from 'react-redux';

class MembershipScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchData: [],
      page: 0,
      loading: true,
      refreshing: false,
      isRefreshing: false, // for pull to refresh
      temp: false,
      pageNumber: 1,
      fabB: false,
      globalWishlist: [],
      searchString: '',
    };
    this.toast = null;
  }

  onRefreshTemp() {
    this.setState({isRefreshing: true, page: 0, refreshing: false}, () => {
      this.getProducts();
    });
  }
  temp = () => {
    this.setState(
      {
        refreshing: this.state.searchData.length > 9,
        page: this.state.page + 1,
        fabB: this.state.searchData.length > 9,
      },
      () => {
        this.getProducts();
      },
    );
  };

  renderFooter = () => (
    <View
      style={{
        marginBottom: 30,
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
      }}>
      {this.state.refreshing && this.state.searchData.length !== 0 ? (
        <View style={{height: 20, marginTop: 30}}>
          <UIActivityIndicator
            size={27}
            count={12}
            color={themeStyle.loadingIndicatorColor}
          />
        </View>
      ) : null}
    </View>
  );
  getProducts = async () => {
    this.setState({temp: true});
    let url = 'products';
    url += '?limit=' + 10;
    url += '&getCategory=1';
    url += '&getDetail=1';
    url += '&language_id=' + this.props.settings.language_id;
    url += '&currency=' + this.props.settings.currency_id;
    url += '&stock=1';
    url += '&page=' + this.state.page;
    url += '&searchParameter=' + this.state.searchString;
    const json = await getHttp(getUrl() + url, {});
    for (const value of json.data.data) {
      this.state.searchData.push(value);
    }
    this.setState({
      temp: false,
      isRefreshing: false,
      refreshing: false,
      page: this.state.page + 1,
    });
  };

  setSearchState = value => {
    this.setState({searchString: value});
  };

  removeSearchState = () => {
    this.setState({searchString: ''});
  };

  onSearchPress = searchString => {
    const temp = searchString;
    this.setState({searchString: ''}, () => {
      this.props.navigation.push('NewestScreen', {
        searchString: temp,
      });
    });
  };

  selectedItem(text, key) {
    return (
      <TouchableOpacity
        key={key}
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: appTextStyle.customRadius - 15,
          paddingHorizontal: 12,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderColor: this.props.themeStyle.iconPrimaryColor,
          margin: 8,
          backgroundColor: this.props.themeStyle.primaryBackgroundColor,
        }}
        onPress={() => {
          this.onSearchPress(text);
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: appTextStyle.mediumSize,
            fontFamily: appTextStyle.fontFamily,
            color: this.props.themeStyle.textColor,
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  handleScroll(event) {
    if (
      this.state.fabB &&
      event.nativeEvent.contentOffset.y >= 0 &&
      event.nativeEvent.contentOffset.y < 300
    ) {
      this.setState({fabB: false});
    }
  }

  handlePress = () => {
    this.props.navigation.push('NewestScreen', {
      searchString: 'basic',
    });

    // this.props.navigation.navigate('ProductDetails', {
    //   objectArray: {
    //     id: 510970,
    //     name: 'Basic',
    //     slug: 'basic',
    //     permalink: 'https://weaclimsolutions.com/product/basic/',
    //     date_created: '2023-11-18T13:54:02',
    //     date_created_gmt: '2023-11-18T08:24:02',
    //     date_modified: '2023-12-05T18:27:36',
    //     date_modified_gmt: '2023-12-05T12:57:36',
    //     type: 'simple',
    //     status: 'publish',
    //     featured: false,
    //     catalog_visibility: 'visible',
    //     description: '',
    //     short_description: '',
    //     sku: '',
    //     price: '600',
    //     regular_price: '600',
    //     sale_price: '',
    //     date_on_sale_from: null,
    //     date_on_sale_from_gmt: null,
    //     date_on_sale_to: null,
    //     date_on_sale_to_gmt: null,
    //     on_sale: false,
    //     purchasable: true,
    //     total_sales: 0,
    //     virtual: false,
    //     downloadable: false,
    //     downloads: [],
    //     download_limit: -1,
    //     download_expiry: -1,
    //     external_url: '',
    //     button_text: '',
    //     tax_status: 'taxable',
    //     tax_class: '',
    //     manage_stock: false,
    //     stock_quantity: null,
    //     backorders: 'no',
    //     backorders_allowed: false,
    //     backordered: false,
    //     low_stock_amount: null,
    //     sold_individually: false,
    //     weight: '',
    //     dimensions: {length: '', width: '', height: ''},
    //     shipping_required: true,
    //     shipping_taxable: true,
    //     shipping_class: '',
    //     shipping_class_id: 0,
    //     reviews_allowed: false,
    //     average_rating: '0.00',
    //     rating_count: 0,
    //     upsell_ids: [],
    //     cross_sell_ids: [],
    //     parent_id: 0,
    //     purchase_note: '',
    //     categories: [{id: 15, name: 'Uncategorized', slug: 'uncategorized'}],
    //     tags: [],
    //     images: [
    //       {
    //         id: 542276,
    //         date_created: '2023-12-05T23:57:15',
    //         date_created_gmt: '2023-12-05T12:57:15',
    //         date_modified: '2023-12-05T23:57:15',
    //         date_modified_gmt: '2023-12-05T12:57:15',
    //         src:
    //           'https://weaclimsolutions.com/wp-content/uploads/2023/11/basic-icon.webp',
    //         name: 'basic-icon',
    //         alt: '',
    //       },
    //     ],
    //     attributes: [],
    //     default_attributes: [],
    //     variations: [],
    //     grouped_products: [],
    //     menu_order: 0,
    //     price_html:
    //       '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#8377;</span>600.00</bdi></span>',
    //     related_ids: [510974, 510977],
    //     meta_data: [
    //       {id: 4546981, key: 'apvc_active_counter', value: 'Yes'},
    //       {id: 4546982, key: 'count_start_from', value: ''},
    //       {id: 4546983, key: 'widget_label', value: ''},
    //       {id: 4546991, key: '_wp_page_template', value: 'default'},
    //       {id: 4546992, key: '_yoast_wpseo_focuskeywords', value: '[]'},
    //       {id: 4546993, key: '_yoast_wpseo_keywordsynonyms', value: '[""]'},
    //       {
    //         id: 4546994,
    //         key: '_yoast_wpseo_estimated-reading-time-minutes',
    //         value: '0',
    //       },
    //       {id: 4546995, key: '_yoast_wpseo_wordproof_timestamp', value: ''},
    //       {id: 4546996, key: '_sizechart_select', value: ''},
    //       {
    //         id: 4547013,
    //         key:
    //           '_wc_memberships_use_custom_product_viewing_restricted_message',
    //         value: 'no',
    //       },
    //       {
    //         id: 4547014,
    //         key:
    //           '_wc_memberships_use_custom_product_purchasing_restricted_message',
    //         value: 'no',
    //       },
    //       {id: 4547015, key: '_wc_memberships_force_public', value: 'no'},
    //       {id: 4547016, key: '_wc_memberships_exclude_discounts', value: 'no'},
    //       {id: 4547017, key: 'inline_featured_image', value: '0'},
    //       {id: 4547018, key: '_yoast_wpseo_primary_product_cat', value: ''},
    //       {id: 4547019, key: 'ekit_post_views_count', value: '79'},
    //       {id: 5709658, key: '_elementor_edit_mode', value: 'builder'},
    //       {id: 5709659, key: '_elementor_template_type', value: 'product-post'},
    //       {id: 5709660, key: '_elementor_version', value: '3.5.6'},
    //       {id: 5709661, key: '_elementor_pro_version', value: '3.5.1'},
    //       {
    //         id: 5709662,
    //         key: '_elementor_css',
    //         value: {
    //           '0': '',
    //           time: 1707205525,
    //           fonts: [],
    //           icons: [],
    //           dynamic_elements_ids: [],
    //           status: 'empty',
    //           css: '',
    //         },
    //       },
    //     ],
    //     stock_status: 'instock',
    //     has_options: false,
    //     yoast_head:
    //       '<!-- This site is optimized with the Yoast SEO Premium plugin v18.9 (Yoast SEO v20.7) - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Basic - WeaClim Solutions</title>\n<!-- Admin only notice: this page does not show a meta description because it does not have one, either write it for this page specifically or go into the [Yoast SEO - Settings] menu and set up a template. -->\n<meta name="robots" content="noindex, follow" />\n<meta property="og:locale" content="en_US" class="yoast-seo-meta-tag" />\n<meta property="og:type" content="article" class="yoast-seo-meta-tag" />\n<meta property="og:title" content="Basic" class="yoast-seo-meta-tag" />\n<meta property="og:description" content="Content Area" class="yoast-seo-meta-tag" />\n<meta property="og:url" content="https://weaclimsolutions.com/product/basic/" class="yoast-seo-meta-tag" />\n<meta property="og:site_name" content="WeaClim Solutions" class="yoast-seo-meta-tag" />\n<meta property="article:publisher" content="https://www.facebook.com/profile.php?id=100083176488359" class="yoast-seo-meta-tag" />\n<meta property="article:modified_time" content="2023-12-05T12:57:36+00:00" class="yoast-seo-meta-tag" />\n<meta property="og:image" content="https://weaclimsolutions.com/wp-content/uploads/2023/11/basic-icon.webp" class="yoast-seo-meta-tag" />\n\t<meta property="og:image:width" content="1364" class="yoast-seo-meta-tag" />\n\t<meta property="og:image:height" content="1395" class="yoast-seo-meta-tag" />\n\t<meta property="og:image:type" content="image/webp" class="yoast-seo-meta-tag" />\n<meta name="twitter:card" content="summary_large_image" class="yoast-seo-meta-tag" />\n<meta name="twitter:site" content="@Weaclimsol" class="yoast-seo-meta-tag" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://weaclimsolutions.com/product/basic/","url":"https://weaclimsolutions.com/product/basic/","name":"Basic - WeaClim Solutions","isPartOf":{"@id":"https://weaclimsolutions.com/#website"},"datePublished":"2023-11-18T08:24:02+00:00","dateModified":"2023-12-05T12:57:36+00:00","breadcrumb":{"@id":"https://weaclimsolutions.com/product/basic/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://weaclimsolutions.com/product/basic/"]}]},{"@type":"BreadcrumbList","@id":"https://weaclimsolutions.com/product/basic/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://weaclimsolutions.com/"},{"@type":"ListItem","position":2,"name":"Shop","item":"https://weaclimsolutions.com/shop/"},{"@type":"ListItem","position":3,"name":"Basic"}]},{"@type":"WebSite","@id":"https://weaclimsolutions.com/#website","url":"https://weaclimsolutions.com/","name":"https://www.weaclimsolutions.com","description":"Enhancing Climate Action","publisher":{"@id":"https://weaclimsolutions.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://weaclimsolutions.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://weaclimsolutions.com/#organization","name":"WeaClim Solutions Pvt Ltd","url":"https://weaclimsolutions.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://weaclimsolutions.com/#/schema/logo/image/","url":"https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png","contentUrl":"https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png","width":400,"height":400,"caption":"WeaClim Solutions Pvt Ltd"},"image":{"@id":"https://weaclimsolutions.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/profile.php?id=100083176488359","https://twitter.com/Weaclimsol","https://www.instagram.com/weaclimate/","https://www.linkedin.com/company/82579180/admin/"]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->',
    //     yoast_head_json: {
    //       title: 'Basic - WeaClim Solutions',
    //       robots: {index: 'noindex', follow: 'follow'},
    //       og_locale: 'en_US',
    //       og_type: 'article',
    //       og_title: 'Basic',
    //       og_description: 'Content Area',
    //       og_url: 'https://weaclimsolutions.com/product/basic/',
    //       og_site_name: 'WeaClim Solutions',
    //       article_publisher:
    //         'https://www.facebook.com/profile.php?id=100083176488359',
    //       article_modified_time: '2023-12-05T12:57:36+00:00',
    //       og_image: [
    //         {
    //           width: 1364,
    //           height: 1395,
    //           url:
    //             'https://weaclimsolutions.com/wp-content/uploads/2023/11/basic-icon.webp',
    //           type: 'image/webp',
    //         },
    //       ],
    //       twitter_card: 'summary_large_image',
    //       twitter_site: '@Weaclimsol',
    //       schema: {
    //         '@context': 'https://schema.org',
    //         '@graph': [
    //           {
    //             '@type': 'WebPage',
    //             '@id': 'https://weaclimsolutions.com/product/basic/',
    //             url: 'https://weaclimsolutions.com/product/basic/',
    //             name: 'Basic - WeaClim Solutions',
    //             isPartOf: {'@id': 'https://weaclimsolutions.com/#website'},
    //             datePublished: '2023-11-18T08:24:02+00:00',
    //             dateModified: '2023-12-05T12:57:36+00:00',
    //             breadcrumb: {
    //               '@id':
    //                 'https://weaclimsolutions.com/product/basic/#breadcrumb',
    //             },
    //             inLanguage: 'en-US',
    //             potentialAction: [
    //               {
    //                 '@type': 'ReadAction',
    //                 target: ['https://weaclimsolutions.com/product/basic/'],
    //               },
    //             ],
    //           },
    //           {
    //             '@type': 'BreadcrumbList',
    //             '@id': 'https://weaclimsolutions.com/product/basic/#breadcrumb',
    //             itemListElement: [
    //               {
    //                 '@type': 'ListItem',
    //                 position: 1,
    //                 name: 'Home',
    //                 item: 'https://weaclimsolutions.com/',
    //               },
    //               {
    //                 '@type': 'ListItem',
    //                 position: 2,
    //                 name: 'Shop',
    //                 item: 'https://weaclimsolutions.com/shop/',
    //               },
    //               {'@type': 'ListItem', position: 3, name: 'Basic'},
    //             ],
    //           },
    //           {
    //             '@type': 'WebSite',
    //             '@id': 'https://weaclimsolutions.com/#website',
    //             url: 'https://weaclimsolutions.com/',
    //             name: 'https://www.weaclimsolutions.com',
    //             description: 'Enhancing Climate Action',
    //             publisher: {
    //               '@id': 'https://weaclimsolutions.com/#organization',
    //             },
    //             potentialAction: [
    //               {
    //                 '@type': 'SearchAction',
    //                 target: {
    //                   '@type': 'EntryPoint',
    //                   urlTemplate:
    //                     'https://weaclimsolutions.com/?s={search_term_string}',
    //                 },
    //                 'query-input': 'required name=search_term_string',
    //               },
    //             ],
    //             inLanguage: 'en-US',
    //           },
    //           {
    //             '@type': 'Organization',
    //             '@id': 'https://weaclimsolutions.com/#organization',
    //             name: 'WeaClim Solutions Pvt Ltd',
    //             url: 'https://weaclimsolutions.com/',
    //             logo: {
    //               '@type': 'ImageObject',
    //               inLanguage: 'en-US',
    //               '@id': 'https://weaclimsolutions.com/#/schema/logo/image/',
    //               url:
    //                 'https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png',
    //               contentUrl:
    //                 'https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png',
    //               width: 400,
    //               height: 400,
    //               caption: 'WeaClim Solutions Pvt Ltd',
    //             },
    //             image: {
    //               '@id': 'https://weaclimsolutions.com/#/schema/logo/image/',
    //             },
    //             sameAs: [
    //               'https://www.facebook.com/profile.php?id=100083176488359',
    //               'https://twitter.com/Weaclimsol',
    //               'https://www.instagram.com/weaclimate/',
    //               'https://www.linkedin.com/company/82579180/admin/',
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //     _links: {
    //       self: [
    //         {
    //           href:
    //             'https://weaclimsolutions.com/wp-json/wc/v3/products/510970',
    //         },
    //       ],
    //       collection: [
    //         {href: 'https://weaclimsolutions.com/wp-json/wc/v3/products'},
    //       ],
    //     },
    //   },
    // });
  };

  handlePressSilver = () => {
    // alert('hello');
    this.props.navigation.push('NewestScreen', {
      searchString: 'Silver',
    });
    // this.props.navigation.navigate('ProductDetails', {
    //   objectArray: {
    //     id: 510974,
    //     name: 'Silver',
    //     slug: 'silver',
    //     permalink: 'https://weaclimsolutions.com/product/silver/',
    //     date_created: '2023-11-18T13:55:23',
    //     date_created_gmt: '2023-11-18T08:25:23',
    //     date_modified: '2023-12-05T18:28:46',
    //     date_modified_gmt: '2023-12-05T12:58:46',
    //     type: 'simple',
    //     status: 'publish',
    //     featured: false,
    //     catalog_visibility: 'visible',
    //     description: '',
    //     short_description: '',
    //     sku: '',
    //     price: '3600',
    //     regular_price: '3600',
    //     sale_price: '',
    //     date_on_sale_from: null,
    //     date_on_sale_from_gmt: null,
    //     date_on_sale_to: null,
    //     date_on_sale_to_gmt: null,
    //     on_sale: false,
    //     purchasable: true,
    //     total_sales: 0,
    //     virtual: false,
    //     downloadable: false,
    //     downloads: [],
    //     download_limit: -1,
    //     download_expiry: -1,
    //     external_url: '',
    //     button_text: '',
    //     tax_status: 'taxable',
    //     tax_class: '',
    //     manage_stock: false,
    //     stock_quantity: null,
    //     backorders: 'no',
    //     backorders_allowed: false,
    //     backordered: false,
    //     low_stock_amount: null,
    //     sold_individually: false,
    //     weight: '',
    //     dimensions: {length: '', width: '', height: ''},
    //     shipping_required: true,
    //     shipping_taxable: true,
    //     shipping_class: '',
    //     shipping_class_id: 0,
    //     reviews_allowed: false,
    //     average_rating: '0.00',
    //     rating_count: 0,
    //     upsell_ids: [],
    //     cross_sell_ids: [],
    //     parent_id: 0,
    //     purchase_note: '',
    //     categories: [{id: 15, name: 'Uncategorized', slug: 'uncategorized'}],
    //     tags: [],
    //     images: [
    //       {
    //         id: 542277,
    //         date_created: '2023-12-05T23:58:35',
    //         date_created_gmt: '2023-12-05T12:58:35',
    //         date_modified: '2023-12-05T23:58:35',
    //         date_modified_gmt: '2023-12-05T12:58:35',
    //         src:
    //           'https://weaclimsolutions.com/wp-content/uploads/2023/11/silver.webp',
    //         name: 'silver',
    //         alt: '',
    //       },
    //     ],
    //     attributes: [],
    //     default_attributes: [],
    //     variations: [],
    //     grouped_products: [],
    //     menu_order: 0,
    //     price_html:
    //       '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#8377;</span>3,600.00</bdi></span>',
    //     related_ids: [510977, 510970],
    //     meta_data: [
    //       {id: 4547023, key: 'apvc_active_counter', value: 'Yes'},
    //       {id: 4547024, key: 'count_start_from', value: ''},
    //       {id: 4547025, key: 'widget_label', value: ''},
    //       {id: 4547033, key: '_wp_page_template', value: 'default'},
    //       {id: 4547034, key: '_yoast_wpseo_focuskeywords', value: '[]'},
    //       {id: 4547035, key: '_yoast_wpseo_keywordsynonyms', value: '[""]'},
    //       {
    //         id: 4547036,
    //         key: '_yoast_wpseo_estimated-reading-time-minutes',
    //         value: '0',
    //       },
    //       {id: 4547037, key: '_yoast_wpseo_wordproof_timestamp', value: ''},
    //       {id: 4547038, key: '_sizechart_select', value: ''},
    //       {
    //         id: 4547055,
    //         key:
    //           '_wc_memberships_use_custom_product_viewing_restricted_message',
    //         value: 'no',
    //       },
    //       {
    //         id: 4547056,
    //         key:
    //           '_wc_memberships_use_custom_product_purchasing_restricted_message',
    //         value: 'no',
    //       },
    //       {id: 4547057, key: '_wc_memberships_force_public', value: 'no'},
    //       {id: 4547058, key: '_wc_memberships_exclude_discounts', value: 'no'},
    //       {id: 4547059, key: 'inline_featured_image', value: '0'},
    //       {id: 4547060, key: '_yoast_wpseo_primary_product_cat', value: ''},
    //       {id: 4547099, key: 'ekit_post_views_count', value: '58'},
    //     ],
    //     stock_status: 'instock',
    //     has_options: false,
    //     yoast_head:
    //       '<!-- This site is optimized with the Yoast SEO Premium plugin v18.9 (Yoast SEO v20.7) - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Silver - WeaClim Solutions</title>\n<!-- Admin only notice: this page does not show a meta description because it does not have one, either write it for this page specifically or go into the [Yoast SEO - Settings] menu and set up a template. -->\n<meta name="robots" content="noindex, follow" />\n<meta property="og:locale" content="en_US" class="yoast-seo-meta-tag" />\n<meta property="og:type" content="article" class="yoast-seo-meta-tag" />\n<meta property="og:title" content="Silver" class="yoast-seo-meta-tag" />\n<meta property="og:description" content="Content Area" class="yoast-seo-meta-tag" />\n<meta property="og:url" content="https://weaclimsolutions.com/product/silver/" class="yoast-seo-meta-tag" />\n<meta property="og:site_name" content="WeaClim Solutions" class="yoast-seo-meta-tag" />\n<meta property="article:publisher" content="https://www.facebook.com/profile.php?id=100083176488359" class="yoast-seo-meta-tag" />\n<meta property="article:modified_time" content="2023-12-05T12:58:46+00:00" class="yoast-seo-meta-tag" />\n<meta property="og:image" content="https://weaclimsolutions.com/wp-content/uploads/2023/11/silver.webp" class="yoast-seo-meta-tag" />\n\t<meta property="og:image:width" content="816" class="yoast-seo-meta-tag" />\n\t<meta property="og:image:height" content="805" class="yoast-seo-meta-tag" />\n\t<meta property="og:image:type" content="image/webp" class="yoast-seo-meta-tag" />\n<meta name="twitter:card" content="summary_large_image" class="yoast-seo-meta-tag" />\n<meta name="twitter:site" content="@Weaclimsol" class="yoast-seo-meta-tag" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://weaclimsolutions.com/product/silver/","url":"https://weaclimsolutions.com/product/silver/","name":"Silver - WeaClim Solutions","isPartOf":{"@id":"https://weaclimsolutions.com/#website"},"datePublished":"2023-11-18T08:25:23+00:00","dateModified":"2023-12-05T12:58:46+00:00","breadcrumb":{"@id":"https://weaclimsolutions.com/product/silver/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://weaclimsolutions.com/product/silver/"]}]},{"@type":"BreadcrumbList","@id":"https://weaclimsolutions.com/product/silver/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://weaclimsolutions.com/"},{"@type":"ListItem","position":2,"name":"Shop","item":"https://weaclimsolutions.com/shop/"},{"@type":"ListItem","position":3,"name":"Silver"}]},{"@type":"WebSite","@id":"https://weaclimsolutions.com/#website","url":"https://weaclimsolutions.com/","name":"https://www.weaclimsolutions.com","description":"Enhancing Climate Action","publisher":{"@id":"https://weaclimsolutions.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://weaclimsolutions.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://weaclimsolutions.com/#organization","name":"WeaClim Solutions Pvt Ltd","url":"https://weaclimsolutions.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://weaclimsolutions.com/#/schema/logo/image/","url":"https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png","contentUrl":"https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png","width":400,"height":400,"caption":"WeaClim Solutions Pvt Ltd"},"image":{"@id":"https://weaclimsolutions.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/profile.php?id=100083176488359","https://twitter.com/Weaclimsol","https://www.instagram.com/weaclimate/","https://www.linkedin.com/company/82579180/admin/"]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->',
    //     yoast_head_json: {
    //       title: 'Silver - WeaClim Solutions',
    //       robots: {index: 'noindex', follow: 'follow'},
    //       og_locale: 'en_US',
    //       og_type: 'article',
    //       og_title: 'Silver',
    //       og_description: 'Content Area',
    //       og_url: 'https://weaclimsolutions.com/product/silver/',
    //       og_site_name: 'WeaClim Solutions',
    //       article_publisher:
    //         'https://www.facebook.com/profile.php?id=100083176488359',
    //       article_modified_time: '2023-12-05T12:58:46+00:00',
    //       og_image: [
    //         {
    //           width: 816,
    //           height: 805,
    //           url:
    //             'https://weaclimsolutions.com/wp-content/uploads/2023/11/silver.webp',
    //           type: 'image/webp',
    //         },
    //       ],
    //       twitter_card: 'summary_large_image',
    //       twitter_site: '@Weaclimsol',
    //       schema: {
    //         '@context': 'https://schema.org',
    //         '@graph': [
    //           {
    //             '@type': 'WebPage',
    //             '@id': 'https://weaclimsolutions.com/product/silver/',
    //             url: 'https://weaclimsolutions.com/product/silver/',
    //             name: 'Silver - WeaClim Solutions',
    //             isPartOf: {'@id': 'https://weaclimsolutions.com/#website'},
    //             datePublished: '2023-11-18T08:25:23+00:00',
    //             dateModified: '2023-12-05T12:58:46+00:00',
    //             breadcrumb: {
    //               '@id':
    //                 'https://weaclimsolutions.com/product/silver/#breadcrumb',
    //             },
    //             inLanguage: 'en-US',
    //             potentialAction: [
    //               {
    //                 '@type': 'ReadAction',
    //                 target: ['https://weaclimsolutions.com/product/silver/'],
    //               },
    //             ],
    //           },
    //           {
    //             '@type': 'BreadcrumbList',
    //             '@id':
    //               'https://weaclimsolutions.com/product/silver/#breadcrumb',
    //             itemListElement: [
    //               {
    //                 '@type': 'ListItem',
    //                 position: 1,
    //                 name: 'Home',
    //                 item: 'https://weaclimsolutions.com/',
    //               },
    //               {
    //                 '@type': 'ListItem',
    //                 position: 2,
    //                 name: 'Shop',
    //                 item: 'https://weaclimsolutions.com/shop/',
    //               },
    //               {'@type': 'ListItem', position: 3, name: 'Silver'},
    //             ],
    //           },
    //           {
    //             '@type': 'WebSite',
    //             '@id': 'https://weaclimsolutions.com/#website',
    //             url: 'https://weaclimsolutions.com/',
    //             name: 'https://www.weaclimsolutions.com',
    //             description: 'Enhancing Climate Action',
    //             publisher: {
    //               '@id': 'https://weaclimsolutions.com/#organization',
    //             },
    //             potentialAction: [
    //               {
    //                 '@type': 'SearchAction',
    //                 target: {
    //                   '@type': 'EntryPoint',
    //                   urlTemplate:
    //                     'https://weaclimsolutions.com/?s={search_term_string}',
    //                 },
    //                 'query-input': 'required name=search_term_string',
    //               },
    //             ],
    //             inLanguage: 'en-US',
    //           },
    //           {
    //             '@type': 'Organization',
    //             '@id': 'https://weaclimsolutions.com/#organization',
    //             name: 'WeaClim Solutions Pvt Ltd',
    //             url: 'https://weaclimsolutions.com/',
    //             logo: {
    //               '@type': 'ImageObject',
    //               inLanguage: 'en-US',
    //               '@id': 'https://weaclimsolutions.com/#/schema/logo/image/',
    //               url:
    //                 'https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png',
    //               contentUrl:
    //                 'https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png',
    //               width: 400,
    //               height: 400,
    //               caption: 'WeaClim Solutions Pvt Ltd',
    //             },
    //             image: {
    //               '@id': 'https://weaclimsolutions.com/#/schema/logo/image/',
    //             },
    //             sameAs: [
    //               'https://www.facebook.com/profile.php?id=100083176488359',
    //               'https://twitter.com/Weaclimsol',
    //               'https://www.instagram.com/weaclimate/',
    //               'https://www.linkedin.com/company/82579180/admin/',
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //     _links: {
    //       self: [
    //         {
    //           href:
    //             'https://weaclimsolutions.com/wp-json/wc/v3/products/510974',
    //         },
    //       ],
    //       collection: [
    //         {href: 'https://weaclimsolutions.com/wp-json/wc/v3/products'},
    //       ],
    //     },
    //   },
    // });
  };

  handlePressGold = () => {
    this.props.navigation.push('NewestScreen', {
      searchString: 'Gold',
    });
    // this.props.navigation.navigate('ProductDetails', {
    //   objectArray: {
    //     id: 510977,
    //     name: 'Gold',
    //     slug: 'gold',
    //     permalink: 'https://weaclimsolutions.com/product/gold/',
    //     date_created: '2023-11-18T13:55:50',
    //     date_created_gmt: '2023-11-18T08:25:50',
    //     date_modified: '2023-12-07T13:46:42',
    //     date_modified_gmt: '2023-12-07T08:16:42',
    //     type: 'simple',
    //     status: 'publish',
    //     featured: false,
    //     catalog_visibility: 'visible',
    //     description: '',
    //     short_description: '',
    //     sku: '',
    //     price: '7200',
    //     regular_price: '7200',
    //     sale_price: '',
    //     date_on_sale_from: null,
    //     date_on_sale_from_gmt: null,
    //     date_on_sale_to: null,
    //     date_on_sale_to_gmt: null,
    //     on_sale: false,
    //     purchasable: true,
    //     total_sales: 0,
    //     virtual: false,
    //     downloadable: false,
    //     downloads: [],
    //     download_limit: -1,
    //     download_expiry: -1,
    //     external_url: '',
    //     button_text: '',
    //     tax_status: 'taxable',
    //     tax_class: '',
    //     manage_stock: false,
    //     stock_quantity: null,
    //     backorders: 'no',
    //     backorders_allowed: false,
    //     backordered: false,
    //     low_stock_amount: null,
    //     sold_individually: false,
    //     weight: '',
    //     dimensions: {length: '', width: '', height: ''},
    //     shipping_required: true,
    //     shipping_taxable: true,
    //     shipping_class: '',
    //     shipping_class_id: 0,
    //     reviews_allowed: false,
    //     average_rating: '0.00',
    //     rating_count: 0,
    //     upsell_ids: [],
    //     cross_sell_ids: [],
    //     parent_id: 0,
    //     purchase_note: '',
    //     categories: [{id: 15, name: 'Uncategorized', slug: 'uncategorized'}],
    //     tags: [],
    //     images: [
    //       {
    //         id: 552669,
    //         date_created: '2023-12-07T19:16:32',
    //         date_created_gmt: '2023-12-07T08:16:32',
    //         date_modified: '2023-12-07T19:16:32',
    //         date_modified_gmt: '2023-12-07T08:16:32',
    //         src:
    //           'https://weaclimsolutions.com/wp-content/uploads/2023/11/Gold-plan-bg-remove.webp',
    //         name: 'Gold-plan-bg-remove',
    //         alt: '',
    //       },
    //     ],
    //     attributes: [],
    //     default_attributes: [],
    //     variations: [],
    //     grouped_products: [],
    //     menu_order: 0,
    //     price_html:
    //       '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#8377;</span>7,200.00</bdi></span>',
    //     related_ids: [510974, 510970],
    //     meta_data: [
    //       {id: 4547061, key: 'apvc_active_counter', value: 'Yes'},
    //       {id: 4547062, key: 'count_start_from', value: ''},
    //       {id: 4547063, key: 'widget_label', value: ''},
    //       {id: 4547071, key: '_wp_page_template', value: 'default'},
    //       {id: 4547072, key: '_yoast_wpseo_focuskeywords', value: '[]'},
    //       {id: 4547073, key: '_yoast_wpseo_keywordsynonyms', value: '[""]'},
    //       {
    //         id: 4547074,
    //         key: '_yoast_wpseo_estimated-reading-time-minutes',
    //         value: '0',
    //       },
    //       {id: 4547075, key: '_yoast_wpseo_wordproof_timestamp', value: ''},
    //       {id: 4547076, key: '_sizechart_select', value: ''},
    //       {
    //         id: 4547093,
    //         key:
    //           '_wc_memberships_use_custom_product_viewing_restricted_message',
    //         value: 'no',
    //       },
    //       {
    //         id: 4547094,
    //         key:
    //           '_wc_memberships_use_custom_product_purchasing_restricted_message',
    //         value: 'no',
    //       },
    //       {id: 4547095, key: '_wc_memberships_force_public', value: 'no'},
    //       {id: 4547096, key: '_wc_memberships_exclude_discounts', value: 'no'},
    //       {id: 4547097, key: 'inline_featured_image', value: '0'},
    //       {id: 4547098, key: '_yoast_wpseo_primary_product_cat', value: ''},
    //       {id: 4547100, key: 'ekit_post_views_count', value: '39'},
    //     ],
    //     stock_status: 'instock',
    //     has_options: false,
    //     yoast_head:
    //       '<!-- This site is optimized with the Yoast SEO Premium plugin v18.9 (Yoast SEO v20.7) - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gold - WeaClim Solutions</title>\n<!-- Admin only notice: this page does not show a meta description because it does not have one, either write it for this page specifically or go into the [Yoast SEO - Settings] menu and set up a template. -->\n<meta name="robots" content="noindex, follow" />\n<meta property="og:locale" content="en_US" class="yoast-seo-meta-tag" />\n<meta property="og:type" content="article" class="yoast-seo-meta-tag" />\n<meta property="og:title" content="Gold" class="yoast-seo-meta-tag" />\n<meta property="og:description" content="Content Area" class="yoast-seo-meta-tag" />\n<meta property="og:url" content="https://weaclimsolutions.com/product/gold/" class="yoast-seo-meta-tag" />\n<meta property="og:site_name" content="WeaClim Solutions" class="yoast-seo-meta-tag" />\n<meta property="article:publisher" content="https://www.facebook.com/profile.php?id=100083176488359" class="yoast-seo-meta-tag" />\n<meta property="article:modified_time" content="2023-12-07T08:16:42+00:00" class="yoast-seo-meta-tag" />\n<meta property="og:image" content="https://weaclimsolutions.com/wp-content/uploads/2023/11/Gold-plan-bg-remove.webp" class="yoast-seo-meta-tag" />\n\t<meta property="og:image:width" content="226" class="yoast-seo-meta-tag" />\n\t<meta property="og:image:height" content="223" class="yoast-seo-meta-tag" />\n\t<meta property="og:image:type" content="image/webp" class="yoast-seo-meta-tag" />\n<meta name="twitter:card" content="summary_large_image" class="yoast-seo-meta-tag" />\n<meta name="twitter:site" content="@Weaclimsol" class="yoast-seo-meta-tag" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://weaclimsolutions.com/product/gold/","url":"https://weaclimsolutions.com/product/gold/","name":"Gold - WeaClim Solutions","isPartOf":{"@id":"https://weaclimsolutions.com/#website"},"datePublished":"2023-11-18T08:25:50+00:00","dateModified":"2023-12-07T08:16:42+00:00","breadcrumb":{"@id":"https://weaclimsolutions.com/product/gold/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://weaclimsolutions.com/product/gold/"]}]},{"@type":"BreadcrumbList","@id":"https://weaclimsolutions.com/product/gold/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://weaclimsolutions.com/"},{"@type":"ListItem","position":2,"name":"Shop","item":"https://weaclimsolutions.com/shop/"},{"@type":"ListItem","position":3,"name":"Gold"}]},{"@type":"WebSite","@id":"https://weaclimsolutions.com/#website","url":"https://weaclimsolutions.com/","name":"https://www.weaclimsolutions.com","description":"Enhancing Climate Action","publisher":{"@id":"https://weaclimsolutions.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://weaclimsolutions.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://weaclimsolutions.com/#organization","name":"WeaClim Solutions Pvt Ltd","url":"https://weaclimsolutions.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://weaclimsolutions.com/#/schema/logo/image/","url":"https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png","contentUrl":"https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png","width":400,"height":400,"caption":"WeaClim Solutions Pvt Ltd"},"image":{"@id":"https://weaclimsolutions.com/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/profile.php?id=100083176488359","https://twitter.com/Weaclimsol","https://www.instagram.com/weaclimate/","https://www.linkedin.com/company/82579180/admin/"]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->',
    //     yoast_head_json: {
    //       title: 'Gold - WeaClim Solutions',
    //       robots: {index: 'noindex', follow: 'follow'},
    //       og_locale: 'en_US',
    //       og_type: 'article',
    //       og_title: 'Gold',
    //       og_description: 'Content Area',
    //       og_url: 'https://weaclimsolutions.com/product/gold/',
    //       og_site_name: 'WeaClim Solutions',
    //       article_publisher:
    //         'https://www.facebook.com/profile.php?id=100083176488359',
    //       article_modified_time: '2023-12-07T08:16:42+00:00',
    //       og_image: [
    //         {
    //           width: 226,
    //           height: 223,
    //           url:
    //             'https://weaclimsolutions.com/wp-content/uploads/2023/11/Gold-plan-bg-remove.webp',
    //           type: 'image/webp',
    //         },
    //       ],
    //       twitter_card: 'summary_large_image',
    //       twitter_site: '@Weaclimsol',
    //       schema: {
    //         '@context': 'https://schema.org',
    //         '@graph': [
    //           {
    //             '@type': 'WebPage',
    //             '@id': 'https://weaclimsolutions.com/product/gold/',
    //             url: 'https://weaclimsolutions.com/product/gold/',
    //             name: 'Gold - WeaClim Solutions',
    //             isPartOf: {'@id': 'https://weaclimsolutions.com/#website'},
    //             datePublished: '2023-11-18T08:25:50+00:00',
    //             dateModified: '2023-12-07T08:16:42+00:00',
    //             breadcrumb: {
    //               '@id':
    //                 'https://weaclimsolutions.com/product/gold/#breadcrumb',
    //             },
    //             inLanguage: 'en-US',
    //             potentialAction: [
    //               {
    //                 '@type': 'ReadAction',
    //                 target: ['https://weaclimsolutions.com/product/gold/'],
    //               },
    //             ],
    //           },
    //           {
    //             '@type': 'BreadcrumbList',
    //             '@id': 'https://weaclimsolutions.com/product/gold/#breadcrumb',
    //             itemListElement: [
    //               {
    //                 '@type': 'ListItem',
    //                 position: 1,
    //                 name: 'Home',
    //                 item: 'https://weaclimsolutions.com/',
    //               },
    //               {
    //                 '@type': 'ListItem',
    //                 position: 2,
    //                 name: 'Shop',
    //                 item: 'https://weaclimsolutions.com/shop/',
    //               },
    //               {'@type': 'ListItem', position: 3, name: 'Gold'},
    //             ],
    //           },
    //           {
    //             '@type': 'WebSite',
    //             '@id': 'https://weaclimsolutions.com/#website',
    //             url: 'https://weaclimsolutions.com/',
    //             name: 'https://www.weaclimsolutions.com',
    //             description: 'Enhancing Climate Action',
    //             publisher: {
    //               '@id': 'https://weaclimsolutions.com/#organization',
    //             },
    //             potentialAction: [
    //               {
    //                 '@type': 'SearchAction',
    //                 target: {
    //                   '@type': 'EntryPoint',
    //                   urlTemplate:
    //                     'https://weaclimsolutions.com/?s={search_term_string}',
    //                 },
    //                 'query-input': 'required name=search_term_string',
    //               },
    //             ],
    //             inLanguage: 'en-US',
    //           },
    //           {
    //             '@type': 'Organization',
    //             '@id': 'https://weaclimsolutions.com/#organization',
    //             name: 'WeaClim Solutions Pvt Ltd',
    //             url: 'https://weaclimsolutions.com/',
    //             logo: {
    //               '@type': 'ImageObject',
    //               inLanguage: 'en-US',
    //               '@id': 'https://weaclimsolutions.com/#/schema/logo/image/',
    //               url:
    //                 'https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png',
    //               contentUrl:
    //                 'https://weaclimsolutions.com/wp-content/uploads/2020/08/WeaClim_Logo_Transparent1.png',
    //               width: 400,
    //               height: 400,
    //               caption: 'WeaClim Solutions Pvt Ltd',
    //             },
    //             image: {
    //               '@id': 'https://weaclimsolutions.com/#/schema/logo/image/',
    //             },
    //             sameAs: [
    //               'https://www.facebook.com/profile.php?id=100083176488359',
    //               'https://twitter.com/Weaclimsol',
    //               'https://www.instagram.com/weaclimate/',
    //               'https://www.linkedin.com/company/82579180/admin/',
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //     _links: {
    //       self: [
    //         {
    //           href:
    //             'https://weaclimsolutions.com/wp-json/wc/v3/products/510977',
    //         },
    //       ],
    //       collection: [
    //         {href: 'https://weaclimsolutions.com/wp-json/wc/v3/products'},
    //       ],
    //     },
    //   },
    // });
  };
  ContactUsScreen;
  handlePressPlatinum = () => {
    this.props.navigation.navigate('ContactUsScreen');
  };

  handlePressDiamond = () => {
    this.props.navigation.navigate('ContactUsScreen');
  };

  // export async function searchProducts(searchString, languageId, currencyId, page) {
  //   let url = 'products'
  //   url += '?limit=' + 10
  //   url += '&getCategory=1'
  //   url += '&getDetail=1'
  //   url += '&language_id=' + languageId
  //   url += '&currency=' + currencyId
  //   url += '&stock=1'
  //   url += '&page=' + page
  //   url += '&searchParameter=' + searchString

  //   const json = await getHttp(getUrl() + url, {})
  //   return json.data.data
  // }

  render() {
    // alert(JSON.stringify(this.props.productsData))
    // console.log(this.props.productsData);
    // const productsData = useSelector((state)=> state.productData )

    console.log(this.props.products);

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{marginTop: 25, marginBottom: 15}}>
            <MembershipComponent
              membershipType="BASIC"
              price={600}
              offer="FREE DOWNLOAD OF ALL PRODUCTS FOR 1 MONTH"
              onPress1={this.handlePress}
              Buy={'BUY NOW'}
            />
          </View>
          <View style={{marginTop: 25, marginBottom: 15}}>
            <MembershipComponent
              membershipType="SILVER"
              price={3600}
              offer="FREE DOWNLOAD OF ALL PRODUCTS FOR 6 MONTH"
              onPress1={this.handlePressSilver}
              Buy={'BUY NOW'}
            />
          </View>
          <View style={{marginTop: 25, marginBottom: 15}}>
            <MembershipComponent
              membershipType="GOLD"
              price={7200}
              offer="FREE DOWNLOAD OF ALL PRODUCTS FOR 12 MONTH"
              onPress1={this.handlePressGold}
              Buy={'BUY NOW'}
            />
          </View>
          <View style={{marginTop: 25, marginBottom: 15}}>
            <MembershipComponent
              membershipType="Platinum Science Pro"
              price={1200}
              offer5={
                '● PRE-PROCESSING: Pre-processing in weather modeling involves preparing and refining input data before running the models. It includes tasks such as collecting data from various sources.\n\n● PROCESSING: Processing in weather modeling involves running numerical models that simulate atmospheric conditions using pre-processed data. It applies mathematical equations and computational techniques to predict weather patterns.\n\n● POST-PROCESSING: Post-processing in weather modeling involves analyzing and refining the output of numerical models to improve accuracy and usability. It includes techniques such as statistical correction, spatial and temporal interpolation, verification against observations, visualization, downscaling, and ensemble forecasting.\n\n● VISUALISATION PACKAGES: Popular visualization packages used in weather modeling include GRaDS, RIP, Matplotlib, Cartopy, Basemap, MetPy, NCL (NCAR Command Language), IDV (Integrated Data Viewer), and Panoply.\n\n\nNote: Payment Gateway / Link will be opened only when the sessions are planned.'
              }
              onPress1={this.handlePressPlatinum}
              Buy={'Contact Us'}
            />
          </View>
          <View style={{marginTop: 25, marginBottom: 15}}>
            <MembershipComponent
              membershipType="Diamond Business Pro"
              price={10800}
              offer1={
                'TAILORMADE METEOROLOGICAL REQUIREMENT SPECIFIC TO THE INDUSTRIES'
            }
              offer5={
                '● Renewable Energy.\n\n● Distribution Companies (DISCOMs).\n\n● Forestry.\n\n● Fishery.\n\n● Agriculture.\n\n● Logistics & Transportation.\n\n● Aviation.\n\n● Shipping.\n\n● Tourism.\n\n● Telecommunication.\n\n● Insurance Companies.\n\n● Research Institutes.\n\n● Event Management.\n\n\nNote: Payment Gateway / Link will be opened only after the MoU with the concerned Industry has been discussed and finalized. '
              }
              onPress1={this.handlePressDiamond}
              Buy={'Contact Us'}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   products: state.products,
// });

const getTheme = state => state.appConfig.themeStyle;
const getLanguage = state => state.appConfig.languageJson;
const getSettings = state => state.settingsCall.settings;
const getUserData = state => state.userData.user;
const getSearchrData = state => state.searchData.recentSearch;

const getSearchrDataFun = createSelector(
  [getSearchrData],
  getSearchrData => {
    return getSearchrData;
  },
);

const getUserDataFun = createSelector(
  [getUserData],
  getUserData => {
    return getUserData;
  },
);

const getSettingsFun = createSelector(
  [getSettings],
  getSettings => {
    return getSettings;
  },
);
const getThemeFun = createSelector(
  [getTheme],
  getTheme => {
    return getTheme;
  },
);
const getLanguageFun = createSelector(
  [getLanguage],
  getLanguage => {
    return getLanguage;
  },
);

const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  language: getLanguageFun(state),
  settings: getSettingsFun(state),
  userData: getUserDataFun(state),
  recentSearch: getSearchrDataFun(state),
  productsData: state.productData || [],
});

const mapDispatchToProps = dispatch => ({
  removeWishlistProductId: () => dispatch(removeWishlistProductId()),
  addSearchData: value => dispatch(addSearchValue(value)),
  removeSearchData: () => dispatch(clearSearchValue()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembershipScreen);
