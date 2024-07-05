# Threat Model

## System Actors

- `Primary authority of a network` - A single address that creates a network and becomes the admin
    - Defines the configuration of a gateway network (fees, name, description, identity compliance standard, etc)

    - Can manage (add or remove) gatekeepers from the network

    - Receives network fees

- `Gatekeeper` - A single EOA or address that can manage (issue, freeze, revoke, expire) gateway tokens
    - Able to verify identity off-chain during gateway token issuance

- `Dapp integrator` - Dapps can integrate with the gateway protocol to specify which networks work for their identity needs.
    - Can gate EOA's/addresses on-chain to require they have a valid gateway token on a specified network

    - Can verify if an EOA/address has a gateway token on a given network

    - Can cover gateway token fees for users via meta transactions

- `Dapp user` - EOA that is able to receive gateway tokens from a `gatekeeper` on a given network by going through identity verification

- `Gateway Protocol Admin` - A single EOA/address that is able to upgrade and configure the gateway protocol contracts

    - Can configure a minimum staking requirement that gatekeepers must stake in order to join a network

## Key External Functions

- `GatewayToken::mint()`: Triggers the minting of a new gateway token on a given network. Only callable by gatekeepers on the given network.

- `GatewayToken::revoke()`: Triggers the revokation an existing gateway token on a given network. Only callable by gatekeepers on the given network.

- `GatewayToken::verifyToken()`: Verify if a given address has a valid gateway token on a given network or tokenId

- `GatewayNetwork::createNetwork()`: Triggers the creation of a new gateway network. The calling EOA will become the primary authority of the new network

- `GatewayNetwork::addGatekeeper()`: Only callable by the primary authority. Adds gatekeepers to the network

- `GatewayNetwork::withdrawNetworkFees()`: Allows the primary authority of the network to withdraw the network fees paid on the network

- `FlexibleNonceForwarder()::execute()`: Allows for meta-transactions to be executed on gateway token operations

- `Gated::gated()`: Modifier that allows contracts to gate users based on gateway tokens for a given network

# Key Invariants

- A gateway token should only be valid on the gateway network it was issued on

- Gateway tokens are non-transferable 

- Gatekeepers should not be able to charge more than the amount approved by an EOA

- Gateway network names must be unique

- A gateway token with `expiration = 0` should be valid indefinitely

- Only approved gatekeepers should be able to charge users for issuing tokens