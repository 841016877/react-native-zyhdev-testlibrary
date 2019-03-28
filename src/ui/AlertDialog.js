import React from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from 'react-native';
import { PropTypes } from 'prop-types';
import {
    Color,
    ConstWH,
    FontColor,
    FontSize,
} from '../config/Theme';
import TextUtil from '../utils/TextUtil';

const { width } = Dimensions.get('window');
let styles;

/**
 * 自定义弹窗
 * 功能:
 * 自定义标题: dialogTitle
 * 自定义按钮: positiveButton 对应事件positiveCallback, negativeButton 对应事件negativeCallback
 * 内容区域: 默认提供文本和输入框两种类型选择
 * 内容暂时只提供文本,输入框两种类型
 *
 *
 * 测试npm version
 */

export default class AlertDialog extends React.Component {
    static DialogType = {
        INPUT: 'input',
        TEXT: 'text',
    };

    static propTypes = {
        dialogTitle: PropTypes.string,
        dialogContent: PropTypes.string,
        positiveButton: PropTypes.string,
        negativeButton: PropTypes.string,
        dialogContentType: PropTypes.string,
        dialogInputMaxLength: PropTypes.number,
        dialogCallback: PropTypes.func,
        positiveCallback: PropTypes.func,
        negativeCallback: PropTypes.func,
    };

    static defaultProps = {
        dialogTitle: null,
        dialogContent: null,
        positiveButton: null,
        negativeButton: null,
        dialogContentType: null,
        dialogCallback: null,
        positiveCallback: null,
        negativeCallback: null,
        dialogInputMaxLength: null,
    };

    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
    }

    // 控制显示隐藏
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    // 控制按钮区域
    buttonContainer = (positiveButton, negativeButton, positiveCallback, negativeCallback) => {
        let negativeButtonView;
        let positiveButtonView;
        if (!TextUtil.isEmpty(negativeButton)) {
            negativeButtonView = (
                <TouchableOpacity onPress={() => {
                    if (negativeCallback) {
                        negativeCallback();
                    } else {
                        this.setModalVisible(false);
                    }
                }}
                >
                    <Text style={styles.negativeButton}>{negativeButton}</Text>
                </TouchableOpacity>
            );
        }
        if (!TextUtil.isEmpty(positiveButton)) {
            positiveButtonView = (
                <TouchableOpacity onPress={() => {
                    if (positiveCallback) {
                        positiveCallback();
                    } else {
                        this.setModalVisible(false);
                    }
                }}
                >
                    <Text style={styles.positiveButton}>{positiveButton}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.buttonContainer}>
                {negativeButtonView}
                {positiveButtonView}
            </View>
        );
    };

    // 控制title
    dialogTitle = (dialogTitle) => {
        if (dialogTitle == null || dialogTitle === '') {
            return null;
        }
        return (
            <Text style={styles.dialogTitle}>
                {dialogTitle}
            </Text>
        );
    };

    // 控制内容区域
    dialogContent= (dialogContentType, dialogContent, dialogCallback) => {
        if (TextUtil.isEmpty(dialogContentType)
            || dialogContentType === AlertDialog.DialogType.TEXT) {
            return (
                <Text style={styles.dialogContent}>
                    {dialogContent}
                </Text>
            );
        }
        if (dialogContentType === AlertDialog.DialogType.INPUT) {
            const { dialogInputMaxLength } = this.props;
            return (
                <TextInput
                    style={styles.dialogInputContent}
                    placeholderTextColor="#999999"
                    clearTextOnFocus={false}
                    keyboardType="default"
                    returnKeyType="done"
                    placeholder={dialogContent}
                    maxLength={dialogInputMaxLength}
                    onChangeText={dialogCallback}
                />
            );
        }
        return null;
    };

    render() {
        const {
            dialogTitle,
            dialogContent,
            dialogCallback,
            positiveButton,
            negativeButton,
            positiveCallback,
            negativeCallback,
            dialogContentType,
        } = this.props;
        const { modalVisible } = this.state;
        return (
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => this.setModalVisible(false)}
            >
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        {this.dialogTitle(dialogTitle)}
                        {this.dialogContent(dialogContentType, dialogContent, dialogCallback)}
                        {this.buttonContainer(positiveButton,
                            negativeButton,
                            positiveCallback,
                            negativeCallback)}
                    </View>
                </View>
            </Modal>
        );
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
    },
    dialogTitle: {
        paddingTop: 20,
        fontSize: FontSize.size16,
        color: FontColor.mainTextColor,
    },
    dialogContent: {
        fontSize: FontSize.size14,
        color: FontColor.subTextColor,
        margin: 30,
    },
    dialogInputContent: {
        width: width - 120,
        height: 40,
        margin: 30,
        paddingLeft: 10,
        fontSize: FontSize.size14,
        color: FontColor.subTextColor,
        backgroundColor: Color.bgColor,
        borderRadius: 10,
        padding: 0,
    },
    buttonContainer: {
        width: width - 60,
        flexDirection: 'row',
        borderTopWidth: ConstWH.dividerLineHeight,
        borderColor: Color.dividerLineColor,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    positiveButton: {
        width: width / 2 - 30,
        fontSize: FontSize.size16,
        color: Color.mainColor,
        textAlign: 'center',
        paddingTop: 17,
        paddingBottom: 17,
    },
    negativeButton: {
        width: width / 2 - 30,
        fontSize: FontSize.size16,
        color: FontColor.mainTextColor,
        borderRightWidth: ConstWH.dividerLineHeight,
        borderRightColor: Color.dividerLineColor,
        textAlign: 'center',
        paddingTop: 17,
        paddingBottom: 17,
    },
});
