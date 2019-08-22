import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Footer from "@/components/Footer/Footer.vue";

describe("Footer.vue", () => {
  it("renders copyright text when passed as props", () => {
    const wrapper = mount(Footer, {
      propsData: {
        copyrightText: "Powered by Shoonya Technologies Ltd.All Rights Reserved"
      }
    });
    expect(
      wrapper
        .html()
        .toString()
        .includes("Powered by Shoonya Technologies Ltd.All Rights Reserved")
    );
  });
});
