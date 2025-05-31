"use client"

import Card from "@mui/material/Card";
import {Box, CardContent, Link} from "@mui/material";

const Page = () => {
    return (
        <Card sx={{minWidth: '90%'}} >
            <CardContent>
                <Box display="flex" sx={{flexDirection: 'row', justifyContent: 'space-between'}} >
                    <h1>Clients</h1>
                    <Link href="/clients/new" variant="subtitle1" >
                        Add new client
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Page;
