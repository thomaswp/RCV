import { PartialResourceSet, ResourceSet } from "../../resources/ResourceSet";
import { BaseSingleton } from "../Singleton";

export class ResourceManager extends BaseSingleton {

    readonly resources = new ResourceSet();

}