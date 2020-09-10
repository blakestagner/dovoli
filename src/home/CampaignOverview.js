import React from 'react'
import { getOutreachCalls, getCampaignDetails } from '../autho/Repository';
import { CampaignInfo, CampaignCallsMade } from '../components/campaign/CampaignInfo'

export default class CampaignOverView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            outreachCalls: [],
            campaign: ''
        }
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
                <CampaignInfo />
                <hr className="hr" />
                <CampaignCallsMade />
            </div>
        )
    }
}