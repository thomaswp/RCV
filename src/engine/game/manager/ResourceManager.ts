import { PartialResourceSet, ResourceSet } from "../../resources/ResourceSet";
import { BaseSingleton } from "../Singleton";

// TODO: Remove excess at the end of the turn
export class ResourceManager extends BaseSingleton {

    readonly resources = new ResourceSet();

}