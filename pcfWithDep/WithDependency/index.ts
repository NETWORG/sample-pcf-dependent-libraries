import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as clientLibraries from '@talxis/client-libraries';

interface Lib1 {
    doSomething(): string;
}
interface ILib1 {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    new(): Lib1;
}
interface Lib2 {
    doSomethingElse(): string;
}
interface ILib2 {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    new(): Lib2;
}

interface ICustomWindow extends Window {
    lib1: ILib1;
    lib2: ILib2;
    clientLibraries: typeof clientLibraries;
}
declare const window: ICustomWindow;

export class WithDependency implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.container = container;

        const lib1 = new window.lib1();
        const lib1Result = lib1.doSomething();
        this.log(`lib1 result: ${lib1Result}`);

        const lib2 = new window.lib2();
        const lib2Result = lib2.doSomethingElse();
        this.log(`lib2 result: ${lib2Result}`);

        (async function (log: (message: string) => void) {
            // You need to explicitly call it through window.* otherwise the PCF will not load at all, because the load will crash with missing import
            const tenantId = await window.clientLibraries.getTenantId();
            log(`async call to @talxis/client-libraries: ${tenantId}`);
        })(this.log);
    }

    private log(message: string) {
        console.log(message);
        this.container.appendChild(document.createTextNode(message));
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
