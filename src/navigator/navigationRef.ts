import { NavigationActions, NavigationParams, NavigationContainerComponent } from 'react-navigation';

let navigation: NavigationContainerComponent;

export const setNavigator = (nav: NavigationContainerComponent) => {
    navigation = nav;
};

export const navigate = (routeName: string, params?: NavigationParams) => {
    navigation.dispatch(NavigationActions.navigate({ routeName, params }));
};
