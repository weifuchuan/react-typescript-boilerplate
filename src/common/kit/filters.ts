
import { Control, Filter } from "react-keeper";
import Account, { IAccount  } from "@/common/models/Account";
import { message, notification } from "antd";
import repeat from "@/common/kit/functions/repeat";

type FiltedComponent = {
  probingStatus: "start" | "doing" | "end";
  logged: boolean;
};

export const buildLoggedFilter: (
  _this: FiltedComponent
) => Filter = _this => async (cb, props) => {
  repeat(() => {
    if (_this.probingStatus === "end") {
      if (_this.logged) {
        cb();
      } else {
        if (Control.path.match(/^\/login/)) Control.go("/login");
        else Control.go(`/login?returnUrl=${Control.path}`);
      }
      return true;
    }
    return false;
  });
};

export const buildUnloggedFilter: (
  _this: FiltedComponent
) => Filter = _this => async (cb, props) => {
  repeat(() => {
    if (_this.probingStatus === "end") {
      if (!_this.logged) {
        cb();
      } else {
        Control.go("/");
      }
      return true;
    }
    return false;
  });
};

export const buildLockFilter: (_this: {
  props: { me: IAccount | null };
}) => Filter = _this => async (cb, props) => {
  if (_this.props.me && Account.STATUS.isLock(_this.props.me)) {
    cb();
  }
};

export const buildUnlockFilter: (_this: {
  props: { me: IAccount | null };
}) => Filter = _this => async (cb, props) => {
  if (_this.props.me && !Account.STATUS.isLock(_this.props.me)) {
    cb();
  } else {
    notification.error({
      message: "您的账号已被锁定",
      description: "锁定账号无法进行任何操作",
      duration: null
    });
  }
};

export const buildActivatedFilter: (_this: {
  props: { me: IAccount | null };
}) => Filter = _this => async (cb, props) => {
  if (_this.props.me && !Account.STATUS.isReg(_this.props.me)) {
    cb();
  } else {
    message.warn("账号未激活");
    Control.go("/activate");
  }
};

export const buildUnactivatedFilter: (_this: {
  props: { me: IAccount | null };
}) => Filter = _this => async (cb, props) => {
  if (_this.props.me && Account.STATUS.isReg(_this.props.me)) {
    cb();
  } else {
    message.warn("账号已激活");
    Control.go("/");
  }
};

export const buildRoleFilter: (
  _this: {
    props: { me: IAccount | null };
  },
  judge: (account: IAccount) => boolean,
  failCallback: () => void
) => Filter = (_this, judge, failCallback) => async (cb, props) => {
  if (_this.props.me && judge(_this.props.me)) {
    cb();
  } else {
    failCallback();
  }
};
