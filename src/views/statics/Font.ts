import { StyleSheet } from "react-native";
import { Color } from "./Color";

const font = StyleSheet.create({
    font10: {
        fontSize: 10,
        color: Color.Gray80,
        letterSpacing: -0.5,
        lineHeight: 14,
    },
    font12: {
        fontSize: 12,
        color: Color.Gray80,
        letterSpacing: -0.5,
        lineHeight: 19,
    },
    font14: {
        fontSize: 14,
        color: Color.Gray80,
        letterSpacing: -0.5,
        lineHeight: 21,
    },
    font16: {
        fontSize: 16,
        color: Color.Gray80,
        letterSpacing: -0.5,
        lineHeight: 23,
    },
    font18: {
        fontSize: 18,
        color: Color.Gray80,
        letterSpacing: -0.5,
        lineHeight: 25,
    },
    font20: {
        fontSize: 20,
        color: Color.Gray80,
        letterSpacing: -0.5,
        lineHeight: 27,
    },
    font22: {
        fontSize: 22,
        color: Color.Gray80,
        letterSpacing: -0.5,
        lineHeight: 30,
    },
    font24: {
        fontSize: 24,
        color: Color.Gray80,
        letterSpacing: -0.5,
        lineHeight: 32,
    },
    font28: {
        fontSize: 28,
        color: Color.Gray80,
        letterSpacing: -0.5,
        lineHeight: 38,
    },
});

export const FontStyle = {
    regular: StyleSheet.create({
        font10: {
            ...font.font10,
            fontFamily: 'SpoqaHanSansNeo-Regular',
        },
        font12: {
            ...font.font12,
            fontFamily: 'SpoqaHanSansNeo-Regular',
        },
        font14: {
            ...font.font14,
            fontFamily: 'SpoqaHanSansNeo-Regular',
        },
        font16: {
            ...font.font16,
            fontFamily: 'SpoqaHanSansNeo-Regular',
        },
        font18: {
            ...font.font18,
            fontFamily: 'SpoqaHanSansNeo-Regular',
        },
        font20: {
            ...font.font20,
            fontFamily: 'SpoqaHanSansNeo-Regular',
        },
        font22: {
            ...font.font22,
            fontFamily: 'SpoqaHanSansNeo-Regular',
        },
        font24: {
            ...font.font24,
            fontFamily: 'SpoqaHanSansNeo-Regular',
        },
        font28: {
            ...font.font28,
            fontFamily: 'SpoqaHanSansNeo-Regular',
        },
    }),
    bold: StyleSheet.create({
        font10: {
            ...font.font10,
            fontFamily: 'SpoqaHanSansNeo-Bold',
        },
        font12: {
            ...font.font12,
            fontFamily: 'SpoqaHanSansNeo-Bold',
        },
        font14: {
            ...font.font14,
            fontFamily: 'SpoqaHanSansNeo-Bold',
        },
        font16: {
            ...font.font16,
            fontFamily: 'SpoqaHanSansNeo-Bold',
        },
        font18: {
            ...font.font18,
            fontFamily: 'SpoqaHanSansNeo-Bold',
        },
        font20: {
            ...font.font20,
            fontFamily: 'SpoqaHanSansNeo-Bold',
        },
        font22: {
            ...font.font22,
            fontFamily: 'SpoqaHanSansNeo-Bold',
        },
        font24: {
            ...font.font24,
            fontFamily: 'SpoqaHanSansNeo-Bold',
        },
        font28: {
            ...font.font28,
            fontFamily: 'SpoqaHanSansNeo-Bold',
        },
    })
}

export default FontStyle;