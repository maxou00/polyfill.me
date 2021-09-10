import { SettingsPageLayout } from "../../settings/SettingPageLayout";
import { ForceProfileSetup } from "../../ui/ForceProfileSetup";
import { Initializer } from "../../ui/Initializer";


export default function Settings() {
    return <Initializer>
        <ForceProfileSetup>
            <SettingsPageLayout>

            </SettingsPageLayout>
        </ForceProfileSetup>
    </Initializer>
}