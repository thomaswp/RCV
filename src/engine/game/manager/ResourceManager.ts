import { PartialResourceSet, ResourceSet } from "../../resources/Cost";
import { BaseSingleton } from "../Singleton";

export class ResourceManager extends BaseSingleton {

    readonly resources = new ResourceSet();

}