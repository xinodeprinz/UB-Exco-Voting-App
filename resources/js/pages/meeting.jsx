import Layout from "../components/layout";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Meeting = ({ campaignID, user, campaign }) => {

    const meeting = async (element) => {

        // generate Kit Token
        const appID = 1112295610;
        const serverSecret = "4a6d13fe448b5b35ce4aecb0209d62de";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            campaignID,
            String(user.id),
            user.name,
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Campaign Link',
                    url: window.location.href,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });
    };

    return (
        <Layout>
            {!campaign && (
                <div className="alert alert-info text-center">
                    There is no ongoing campaign with the Id <strong>{campaignID}</strong>
                </div>
            )}

            {campaign && new Date() >= new Date(campaign.scheduled_on) && <div ref={meeting} />}

            {campaign && new Date() < new Date(campaign.scheduled_on) && (
                <div className="alert alert-success text-center">
                    The campaign with ID <strong>{campaignID}</strong> is scheduled for
                    <span> {new Date(campaign.scheduled_on).toLocaleString()}</span>
                </div>
            )}
        </Layout>
    );
}

export default Meeting