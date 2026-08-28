import '@pnp/sp/webs';
import '@pnp/sp/sites';
import '@pnp/sp/lists';
import '@pnp/graph/users';
import '@pnp/graph/groups';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as spfxCore from 'glb-sp-fx-core';
import store, { AppDispatch, RootState } from '../../redux/Store';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SpFxCore } from 'glb-sp-fx-core/lib/services/spFxCore/SpFxCore';
import { spfi, SPFx as SPSPFx } from '@pnp/sp';
import { IApiExplorerComponentProperties } from './IApiExplorerComponentProperties';
import { ApiExplorerComponent } from './components/ApiExplorerComponent';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default class ApiExplorerWebPart extends BaseClientSideWebPart<Record<string, never>> {

  private _spFxCore: SpFxCore;

  protected async onInit(): Promise<void> {
    this._spFxCore = new spfxCore.SpFxCoreLibrary(this.context);
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IApiExplorerComponentProperties> = React.createElement(
      ApiExplorerComponent,
      {
        SharePointConnection: spfi().using(SPSPFx(this.context)),
        SpFxCore: this._spFxCore,
        Context: this.context
      }
    );

    ReactDom.render(<Provider store={store}>{element}</Provider>, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
