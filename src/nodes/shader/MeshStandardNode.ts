import { Theme } from "../../colors/Theme";
import { Script } from "../../export/Script"; 
import { BaseColorProperty } from "../../properties/BaseColorProperty";
import { MaterialOutput } from "../../properties/MaterialOutput";
import { WinNode } from "../WinNode"; 

export class MeshStandardNode extends WinNode {
 
    protected colorProperty:BaseColorProperty;

    constructor() {

        const colorNodeInput = new BaseColorProperty();

        super( "MeshStandardMaterial", Theme.config.groupShader, [
            new MaterialOutput(),
            colorNodeInput
        ] );

        this.colorProperty = colorNodeInput;
    } 

    override writeScript( script: Script) { 

        const colorNode = this.colorProperty.writeScript( script );
  
        return script.define( this.nodeName, `()=>{
            const material = new THREE.MeshStandardNodeMaterial();
            material.colorNode = ${colorNode};
            return material;
        }` );
    }
}