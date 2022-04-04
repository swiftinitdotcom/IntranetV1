import * as React from 'react';
import styles from './IntranetV1.module.scss';
import { IIntranetV1Props, dynmiclinks, IJsonArray, IJsonMap, linksitems } from './IIntranetV1Props';
import { service } from './code'
import { escape } from '@microsoft/sp-lodash-subset';
import { boundMethod } from 'autobind-decorator';
import { SPHttpClientResponse } from '@microsoft/sp-http';
require('../../assets/css/stylec.css');
const logo: any = require('../../assets/images/logo.png');
const right_arrow: any = require('../../assets/images/right-arrow.png');
export default class IntranetV1 extends React.Component<IIntranetV1Props, dynmiclinks> {
  private service: service;
  public constructor(props: IIntranetV1Props) {
    super(props);
    this.service = new service(this.props.context);
    this.state = {
      config: [
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' },
        { title: '', links: '', sn: '', img: '' }
      ]
    };
  }
  public componentDidMount(): void {
    this._bindlinks();
  }
  public render(): React.ReactElement<IIntranetV1Props> {
    return (
      <div className={'header-bg'}>
        <div className={'container-fluid'}>
          <div className={'row'}>
            <div className={'col-12 col-md-4'}>
              <div className={'ps-5 mt-5'}> <img src={logo} />
                  <div className={'mt-5'}>
                    <h1 className={'text-white'}>PTI STANDARDS</h1>
                    <h6 className={'text-white mt-3'}>Work instructions, supporting documents</h6>
                    <img className={'mt-3'} src={right_arrow} /> </div>
                </div>
            </div>
            <div className={'col-12 col-md-4'}></div>
            <div className={'col-12 col-md-4'}>
              <div className={'mt-5 pe-5'}>
                <div className={'pt-l-5 bg-top text-white text-center'}>
                <a style={{'color':'white'}} 
                href={this.state.config[0].links}>
                  <p style={{'margin-bottom': '30px' }}>{this.state.config[0].title}</p></a>
                  <a style={{'color':'white'}} href={this.state.config[1].links}><p className={'mt-3'}>{this.state.config[1].title}</p></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'service'}>
          <div className={'p-4 bg-color'}></div>
          <div className={'container-fluid'}>
            <div className={'row'}>
              <div className={'col-12'}>
                <ul className={'list-inline text-white text-center m-0 pt-5 pb-5'}>
                  <li className={'list-inline-item'}><a href={this.state.config[2].links}>
                    <img src={this.state.config[2].img} /></a><br />
                    <h5 className={'mt-3'}>{this.state.config[2].title}</h5>
                  </li>
                  <li className={'list-inline-item'}><a href={this.state.config[3].links}>
                    <img src={this.state.config[3].img} /></a><br />
                    <h5 className={'mt-3'}>{this.state.config[3].title}</h5>
                  </li>
                  <li className={'list-inline-item'}><a href={this.state.config[4].links}>
                    <img src={this.state.config[4].img} /></a><br />
                    <h5 className={'mt-3'}>{this.state.config[4].title} </h5>
                  </li>
                  <li className={'list-inline-item'}><a href={this.state.config[5].links}>
                    <img src={this.state.config[5].img} /></a><br />
                    <h5 className={'mt-3'}>{this.state.config[5].title}</h5>
                  </li>
                  <li className={'list-inline-item'}><a href={this.state.config[6].links}>
                    <img src={this.state.config[6].img} /></a><br />
                    <h5 className={'mt-3'}>{this.state.config[6].title} </h5>
                  </li>
                  <li className={'list-inline-item'}><a href={this.state.config[7].links}>
                    <img src={this.state.config[7].img} /></a><br />
                    <h5 className={'mt-3'}>{this.state.config[7].title}</h5>
                  </li>
                  <li className={'list-inline-item'}><a href={this.state.config[8].links}>
                    <img src={this.state.config[8].img} /></a><br />
                    <h5 className={'mt-3'}>{this.state.config[8].title}</h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  @boundMethod
  private _bindlinks(): void {
    const listname: string = this.props.description//'Config';
    const columns: string = 'Id,Title,Header,Links,SN,Imgpath';
    this.service.getListItem('', listname, '', columns, '', '', '')
      .then((response: SPHttpClientResponse) => {
        response.json().then((data: any) => {
          console.log(data);
          let title: string = '';
          let link: string = '';
          let sn: string = '';
          let imgpath: string = '';
          let config: linksitems[] = [];
          const nextprojectData: IJsonArray = data.value as IJsonArray;
          nextprojectData.forEach((item: IJsonMap) => {
            title = item.Header as string;
            link = item.Links as string;
            sn = item.SN as string;
            imgpath = item.Imgpath as string;
            config.push({ title: title, links: link, sn: sn, img: imgpath });

          });
          this.setState({ config: config });
        });
      })
  }
}
