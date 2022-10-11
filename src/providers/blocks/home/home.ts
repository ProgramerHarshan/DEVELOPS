import { Surfaces, Blocks, Elements, Bits, Utilities, setIfTruthy } from 'slack-block-builder';
import { OPEN_MODAL } from 'src/common/constants/actions';

export function home(user: any): any {
    if (user) {
        return Surfaces.HomeTab().blocks(
            Blocks.Section()
                .text(`Hello, <@${user.name}> Welcome to the sample app. You are all set to build a new Slack App\n\n *Sample Buttons:*`),
            Blocks.Divider(),
            Blocks.Actions()
                .elements(
                    Elements.Button({ text: 'Open Sample Modal', actionId: OPEN_MODAL, value: 'Open Sample Modal' }).primary(),
                )
        )
            .buildToJSON();
    }
}