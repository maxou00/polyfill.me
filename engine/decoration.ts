import { blue, blueGrey, grey, pink, red } from "@material-ui/core/colors";

export interface FillablePalette {
    primary: string;
    secondary: string;
    fillable: {
        title: string;
        subtitle: string;
    };
    defaultText: string;
    page: {
        title: string;
        subtitle: string;
        background: string;
    };
    question: {
        title: string;
        description: string;
        error: string;
        helper: string;
    }
}

export interface FillableBranding {
    brand?: {
        logo:string;
        name: string;
        subtitle: string;
    }
    background: {
        color?: string;
        image?: string;
    }
}

export interface FillableDecoration {
    branding?: FillableBranding,
    palette: FillablePalette;
}

const defaultFillablePalette: FillablePalette = {
    primary: blue[500],
    secondary: pink[500],
    fillable: {
        title: '#FFFFFFFF',
        subtitle: '#FAFAFAFF'
    },
    defaultText: grey[900],
    page: {
        title: blueGrey[900],
        subtitle: grey[500],
        background: '#FFFFFFFF'
    },
    question: {
        title: blueGrey[900],
        description: grey[500],
        error: red[600],
        helper: grey[400],
    }
}

export const defaultFillableDecoration: FillableDecoration = {
    palette: defaultFillablePalette,
    branding: {
        brand: {
            logo: '',
            name: '',
            subtitle: ''
        },
        background: {
            color: '#FAFAFA',
            image: ''
        }
    }
}