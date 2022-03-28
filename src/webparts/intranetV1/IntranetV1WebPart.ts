import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'IntranetV1WebPartStrings';
import IntranetV1 from './components/IntranetV1';
import { IIntranetV1Props } from './components/IIntranetV1Props';
import { SPComponentLoader } from '@microsoft/sp-loader';

SPComponentLoader.loadCss('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css');
SPComponentLoader.loadScript('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js');



export interface IIntranetV1WebPartProps {
  description: string;
  listname: string;
}

export default class IntranetV1WebPart extends BaseClientSideWebPart<IIntranetV1WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IIntranetV1Props > = React.createElement(
      IntranetV1,
      {
        description: this.properties.description,
        context: this.context,
        listname: this.properties.listname,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'List Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
