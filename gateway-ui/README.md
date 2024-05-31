# Gateway UI library

This library allows dApps to use an out of the box React component that allows them to verify user passes on a given gatekeeper network and allow users to permisionslessly request new gateway passes.

## Installation
This package has peerDependencies that must be installed prior to installing this package. Please refer to the `package.json` to see those dependencies.

## GatewayPortal UI Component
This collapsable modal provides users with information about a given gatekeeper network, verification of any gateway passes and an end-2-end process for users to request and receive new passes from qualified gatekeepers. Here is an example of how the component can be used:

```typescript
import { CollapsableGatewayPortal } from '@identity/gateway-ui';

....

const Component = (props) => {
    ...
    return(
        <CollapsableGatewayPortal networkName=... userWallet=... />
    )
}

```

The props for this component are:

```typescript
import { Signer, Wallet } from "ethers";

interface CollapsableGatewayProtocolPortalProps {
    networkName: string;
    userWallet: Wallet | Signer;
}
```

## GatewayPortal hook
We also provide a custom React hook that allows dApps to access the state of a given gatekeeper network and any gateway pass data associated with a user. This allows dApps to be able to add logic to their UI based on the prescence of a valid or invalid gateway pass.

Here is an example using this hook:

```typescript
import { useGatewayPortal } from '@identity/gateway-ui';

const RandomComponent = (props) => {
    const { hasValidPass, networkInfo, validPassData, invalidPassData } = useGatewayPortal(networkName, userWallet); //Same inputs as the React component
    
    return(
        ...
    )
}
```

The hook has the same inputs as the `CollpasableGatewayPortal` and returns the `GatewayPortalData` object defined below:

```typescript
interface GatewayPortalData {
    hasValidPass: boolean,
    networkInfo: Network
    validPassData?: ValidPassData
    invalidPassData?: InvalidPassData
}

interface Network {
    name: string // may need to be bytes,
    feeToken: string,
    description: string
}

interface ValidPassData {
    issuerAddress: string,
    linkToGatekeeper: string,
    passExpiration: string
}

interface InvalidPassData {
    potentialIssuers: PassIssuer[];
}

interface PassIssuer {
    issuerAlias: string,
    issuanceFee: string,
    passRequestLink?: string
}
```

## Running Test Suite

We use a combination of storybook and cypress.io for testing the UI library. To run storybook use `yarn storybook` and to run the automated UI test run `yarn cypress:run`.