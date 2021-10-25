import React from "react";
import Types from "prop-types";
import { IntlProvider } from "next-intl";
// import en from "next-intl/locale-data/en";
// import ja from "next-intl/locale-data/ja";
import jaTranslation from "../locales/ja";
import enTranslation from "../locales/en";

// addLocaleData([...en, ...ja]);

// Change django language cookie
import cookieCutter from 'cookie-cutter'

export const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  
constructor(...args) {
    function myCustomErrorFunction (){
            console.log ("NextIntl Error")
        }
    super(...args);

    this.switchToEnglish = () => {
      this.setState({ locale: "en", messages: enTranslation });
      // Set a cookie (just an example)
      cookieCutter.set('django_language', 'en')
    }

    this.switchToJapanese = () => {
      this.setState({ locale: "ja", messages: jaTranslation });
      // Set a cookie (just an example)
      cookieCutter.set('django_language', 'ja')
    }

    // pass everything in state to avoid creating object inside render method (like explained in the documentation)
    this.state = {
      locale: "en",
      messages: enTranslation,
      switchToEnglish: this.switchToEnglish, 
      switchToJapanese: this.switchToJapanese 
    };
  }
  

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Context.Provider value={this.state}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="en"
          onError={this.myCustomErrorFunction}
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

export { IntlProviderWrapper, Context as IntlContext };
