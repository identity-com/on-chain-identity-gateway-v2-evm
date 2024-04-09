import React, { useState } from 'react';
import { Wallet } from "ethers";
import { Box, Button, Chip, CircularProgress, Container, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { GatewayPortalData, useGatewayPortal } from './useGatewayPortal';
import { ArrowUpward } from '@mui/icons-material';


interface CollapsableGatewayProtocolPortalProps {
    networkName: string;
    userWallet: Wallet;
}


export const CollapsableGatewayPortal = (props: CollapsableGatewayProtocolPortalProps) => {
    const { networkName, userWallet } = props;

    const gatewayPortalData = useGatewayPortal({networkName, userWallet: userWallet});

    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const isLoading = !gatewayPortalData;
    const hasValidToken = gatewayPortalData && gatewayPortalData.hasValidPass;

    // Need button to be on both options
    if(isCollapsed) {
        return(
            <CollapsableGatewayButton isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isValid={hasValidToken} isLoading={isLoading}/>
        )
    } else {
        return(
            <Stack sx={{alignItems: "center"}}>
                <CollapsableGatewayButton isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isValid={hasValidToken} isLoading={isLoading}/>
                <GatewayProtocolPortal gatewayPortalData={gatewayPortalData} networkName={networkName}/>
            </Stack>
        )
    }
}

const CollapsableGatewayButton = (props: {isCollapsed: boolean, setIsCollapsed, isValid: boolean, isLoading: boolean}) => {
    const {isCollapsed, setIsCollapsed, isValid, isLoading } = props;
    return (
        <Box>
            <Button 
                variant="contained" 
                endIcon={isCollapsed ? <ArrowDownwardIcon/> : <ArrowUpward/>} 
                onClick={() => {setIsCollapsed(!isCollapsed)}}
                color={ isLoading || isValid ? "primary" : "warning"}
            >
                Gateway Portal
            </Button>
        </Box>
    )
}

interface GatewayProtocolPortalProps {
    networkName: string;
    gatewayPortalData?: GatewayPortalData
}

const GatewayProtocolPortal = (props: GatewayProtocolPortalProps) => {
    const { gatewayPortalData, networkName} = props;

    if(!gatewayPortalData) {
        //Loading indicator
        return(
            <Box>
                <CircularProgress />
            </Box>
        )
    }

    const { networkInfo, hasValidPass } = gatewayPortalData;
    return(
        <Stack sx={{border: hasValidPass ? "2px solid slateblue" : "2px solid #ED6C03", borderRadius: "10px"}} alignItems={"center"} justifyContent={"center"} padding={"1rem"} spacing={3} maxWidth={"750px"}>
            {/* Section for indicating a valid pass being detected or not */}
            <ValidPassIndicator isValid={gatewayPortalData.hasValidPass}/>

            {/* Section for displaying network information */}
            <NetworkInfo name={networkName} description={networkInfo.description} feeTokenText={networkInfo.feeToken}/>
            
            {/* Section for displaying pass info */}
            <PassInfo gatewayPortalData={gatewayPortalData}/>
        </Stack>
    )
}

/////////////// Core UI Views  ////////////////////////////////////////////////////////////////

interface ValidPassIndicatorProps {
    isValid: boolean
}

const ValidPassIndicator = (props: ValidPassIndicatorProps) => {
    const isValid = props.isValid;
    return(
        <Container maxWidth='md' sx={{display: "flex", justifyContent: "center"}}>
            <Chip id="validityChip" label={isValid ? "Valid Pass Detected" : "No Pass Detected"} color={isValid ? "primary" : "warning"} sx={{fontSize: "1.2rem"}}/>
        </Container>
    )
}

interface NetworkInfoProps {
    name: string,
    description: string,
    feeTokenText: string
}

const NetworkInfo = (props: NetworkInfoProps) => {
    const { name, description, feeTokenText} = props
    return(
        <Stack id="Network info"spacing={3} sx={{display: "flex", justifyContent: "center"}}>
            <Typography  variant='h5' sx={{ margin: "0 auto"}}>
                {"Network: " + name}
            </Typography>
            <TextField id="filled-basic" variant="outlined" disabled={true} defaultValue={description} multiline sx={{width: "100%"}}/>
            <Typography variant='body1' style={{marginLeft: 0, marginTop: "1 rem", marginRight: 0}}>
                {"Fee Token: " + feeTokenText}
            </Typography>
        </Stack>
    )
}

interface PassInfoProps {
    gatewayPortalData: GatewayPortalData
}

const PassInfo = (props: PassInfoProps) => {
    const { gatewayPortalData } = props;

    if(gatewayPortalData.hasValidPass) {
        // Show issuer state
        const { validPassData } = gatewayPortalData;
        return(
            <Stack id="valid-pass-data" mt={3} spacing={2} alignItems={"center"} sx={{display: "flex", justifyContent: "center"}}>
                <Stack direction="row" spacing={3} sx={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                    <Typography variant='body1'>
                        Pass Issuer:
                    </Typography>
                    <Typography id="issuer" variant='body1' noWrap style={{maxWidth: "25%"}}>
                        {validPassData.issuerAddress}
                    </Typography>
                    <Button variant="contained">
                        Learn More
                    </Button>
                </Stack>
                <Stack direction="row" spacing={3} sx={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                    <Typography variant='body1'>
                        Pass Expiration: 
                    </Typography>
                    <Typography variant='body1'>
                        {" " + validPassData.passExpiration}
                    </Typography>
                </Stack>
            </Stack>
        )
    } else {
        // Show table of issuers state
        const { invalidPassData } = gatewayPortalData;


        const passIssuers = invalidPassData.potentialIssuers.map(passIssuer => {
            return (
                <Grid id={`pass-issuer-data`} item xs={12} key={passIssuer.issuerAlias.toString()}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography id={`passId-${passIssuer.issuerAlias}`} variant='body2' noWrap style={{maxWidth: "50%"}}>
                                {passIssuer.issuerAlias.toString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='body2'>
                                {passIssuer.issuanceFee.toString()}
                            </Typography>
                        </Grid>
                        <Grid id={`button-${passIssuer.issuerAlias}`} item xs={4}>
                        {
                            passIssuer.passRequestLink.length == 0 ? 
                                <Button id="invalidLink" variant="contained" disabled={passIssuer.passRequestLink.length == 0}>
                                        Request Pass
                                </Button> 
                            :
                                <a id="validLink" href={passIssuer.passRequestLink} target='_blank' style={{textDecoration: 'none'}}>
                                    <Button variant="contained" disabled={passIssuer.passRequestLink.length == 0}>
                                        Request Pass
                                    </Button>
                                </a>
                        }
                        </Grid>
                    </Grid>
                </Grid>
            )
        });

        return(
            <Grid container spacing={2} alignItems={"center"} sx={{display: "flex", justifyContent: "center", maxWidth: "70%"}}>
                <Grid item xs={4}>
                    <Typography variant='body1'>
                        Pass Issuer
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1'>
                        Issuance Fee
                    </Typography>
                </Grid>
                <Grid item xs={4}> </Grid>
                
                {
                    passIssuers
                }
            </Grid>
        )
    }
}