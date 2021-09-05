import { Button, IconButton } from "@material-ui/core";
import { useRef } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { CellRendererProps } from ".";
import { BucketFile } from "../../core";
import { supaClient } from "../../core/utils";
import { FileField } from "../../engine/fields";
import { NoTransformButton } from "../../ui/styled";

export function FileCell(props: CellRendererProps<FileField, BucketFile>) {
    
    const downloadHref = useRef<HTMLAnchorElement>();

    const url = useMemo(() => {
        return supaClient.storage.from("general").getPublicUrl(props.answer.name).publicURL;
    }, [props]);

    const onDownload = useCallback(async() => {
        toast.info("Telechargement en cours...");
        if(url) {
            let res = await fetch(url)
            .then((data) => {
                return data.blob();
            })
            .catch((err) => {
                toast.error("Echec du telechargement");
            })

            if(res &&  downloadHref.current) {
                let url = URL.createObjectURL(res);
                downloadHref.current.href=url;
                toast.info("Fichier téléchargé");
                downloadHref.current.click();
            }
        }
        if(downloadHref.current) {
            downloadHref.current.click();
        }
        
    }, [downloadHref, url]);

    return <div>
        {props.answer.type.startsWith("image/") && <NoTransformButton 
            variant="outlined" 
            color="default" 
            size="small" 
            startIcon={<span className="fi-rr-cloud-download" 
            style={{ fontSize: '14px', margin: '2px', borderRadius: '24px'}}></span>}>
            Visualiser
        </NoTransformButton>
        }
        <NoTransformButton 
            onClick={onDownload} 
            variant="outlined" 
            color="default" 
            size="small" 
            startIcon={<span className="fi-rr-cloud-download" style={{ fontSize: '14px'}}></span>}
            style={{ margin: '2px', borderRadius: '24px'}}>
            Télécharger
        </NoTransformButton>
        {url && <a href={url} download={props.field.title} hidden ref={downloadHref}></a>}
    </div>
}