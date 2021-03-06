import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { InheritProvider } from 'src/components/Popover/ContainerContext';

import { CardWrap, prefixCls } from './style';

/** 卡片布局控件 */
class Card extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        className: PropTypes.string
    };
    savePopupContainer = ref => {
        this.popupContainer = ref;
    };
    /** 由于 react 渲染和 ref 的时机，子组件渲染时无法获取到外部的 ref，故使用上层组件做路引 */
    getPopupContainer = () => this.popupContainer && this.popupContainer.parentNode.parentNode;
    render() {
        const { children, className, ...rest } = this.props;
        return (
            <InheritProvider value={{ getPopupContainer: this.getPopupContainer }}>
                <CardWrap className={classnames(prefixCls, className)} {...rest}>
                    <div ref={this.savePopupContainer}></div>
                    {children}
                </CardWrap>
            </InheritProvider>
        );
    }
}

export default Card;
